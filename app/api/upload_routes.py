from flask import Blueprint, jsonify, request
from werkzeug.exceptions import BadRequestKeyError
from ..models import db, Music_Post, Song, Merchandise
from app.forms import MerchForm, MusicForm
from app.api.auth_routes import validation_errors_to_error_messages
# ====== BOTO3 imports ===============
from .boto3 import user_upload, s3_client
from botocore.exceptions import NoCredentialsError
import boto3

upload_routes = Blueprint('upload', __name__)

# handle music post uploads and merch uploads

#===== UPLOAD MUSIC POST
# create musicPost instance
# try upload song file & image file to bucket w/ music_post_id
# no exception then i now have the url
# create song instances
# return musicPost to be reduced
# <int:userId>/
# se bucket image url = images/music_post/:musicPostId

#==== UPLOAD SONGS
# create song instance (make url nullable?)
# then grab its id tack it onto url
# s3 bucket url = songs/:songId

#===== UPLOAD MERCH
# try upload image to s3 bucket
# s3 bucket url = images/merch/:merchId
# if successful upload to bucket
# assign merch.image = s3 url


@upload_routes.route('/music', methods=['POST'])
def upload_music_post():
    # write middleware to handle err handling.
    #  in the middleware any fails immediately returns err message
    try:
        form = request.form
        musicForm = MusicForm()
        # num_songs = form["num_songs"]

        # music_post = Music_Post(
        #     user_id=form["user_id"],
        #     title=form["title"],
        #     description=form["description"],
        #     price=form["price"]
        # )
        # db.session.add(music_post)
        # db.session.commit()

        # print(form["song"].data[0],'++++++++')
        # for song in form["song"].data[0]:
        #     print(song)
        # print(request.files['song'])
        print(request.form)
        print(request.data)
        print(request.files)
        print(request.files.getlist('song'))
        # print(form["title"])
        # print(form["song"])
        # for f in form['song']:
        #     print

        # for x in range(0,int(num_songs)):
        #     form_song = request.files[f"song-{x}"]
        #     song = Song(
        #         title=form_song.filename,
        #         music_post_id=music_post.id,
        #     )
        #     db.session.add(song)
        #     db.session.flush()

            # don't forget to upload the image from the form as well
        #     upload_success = user_upload(form_song, f"song/{song.id}")
        #     if upload_success:
        #         song.url = f"https://audio-shrub.s3.amazonaws.com/song/{song.id}"
        #     else:
        #         return {"error": "song upload failed"}
        # db.session.commit()
        return {"success":"success"}
    except FileNotFoundError:
        print("The file was not found")
        return False
    except NoCredentialsError:
        print("Credentials not available")
        return False
    except BadRequestKeyError:
        print("bad key request")
        return {"fail":"key req bad"}
    except Exception as e:
        print(e)
        return {"errors":'failed to upload'}

@upload_routes.route('/merch', methods=['POST'])
def upload_merch_post():

    # validate field data before instatiation of merch
    # validate image. file type & size

    form = MerchForm()
    merchForm = request.form
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        merch_post = Merchandise(
            user_id=merchForm["user_id"],
            title=form.data["title"],
            description=form.data["description"],
            price=form.data["price"]
            )
        db.session.add(merch_post)
        db.session.flush()
        try:
            upload_success = user_upload(request.files['image'], f"images/merch/{merch_post.id}")
            if not upload_success:
                return {'errors':'image failed to upload'}
            else:
                merch_post.image = f'https://audio-shrub.s3.amazonaws.com/images/merch/{merch_post.id}'
                db.session.commit()
                return {'success':'success'}
        except:
            return {'errors':'image failed to upload'}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
