from flask import Blueprint, jsonify, request
from .boto3 import upload_user_music, s3_client
from botocore.exceptions import NoCredentialsError
from werkzeug.exceptions import BadRequestKeyError
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
def upload_music():
    try:

        # f = request.form['song'] doesn't work
        # f = request.form.get('song') get None
        # f = request.files('title') typeError
        # f = request.files['song'] bad key req
        # f = request.files['title']
        # title = request.form['title'] bad key req
        # title = request.get_data()
        # print(title)
        f = request.form.get('price')
        print(f, "="*40)

        # successful_upload  = upload_user_music(f[0], "test-song")
        # print("upload success")

        return {"hello":"hi"}
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
        return {"fial":'fail'}

    # except Exception as err:
    #     print(err)
    # return {"temp":"tmep"}
