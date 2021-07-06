from flask import Blueprint, jsonify, request
from werkzeug.exceptions import BadRequestKeyError
from ..models import db, Music_Post, Song, Merchandise
from app.forms import MerchForm, MusicForm
from app.api.auth_routes import validation_errors_to_error_messages
import os
# ====== BOTO3 imports ===============
from .boto3 import user_upload, s3_client
from botocore.exceptions import NoCredentialsError
import boto3

upload_routes = Blueprint('upload', __name__)


@upload_routes.route('/music', methods=['POST'])
def upload_music_post():
    # content file validation
    # must access music files before returning anything or request will stall
    if request.content_length / (1024*1024) > 50:
        return {"errors": "upload size exceeds 50Mb"}, 413

    # form input validation
    form = request.form
    musicForm = MusicForm()
    num_songs = form["num_songs"]
    musicForm['csrf_token'].data = request.cookies['csrf_token']
    if musicForm.validate_on_submit:
        music_post = Music_Post(
            user_id=form["user_id"],
            title=form["title"],
            description=form["description"],
            price=form["price"]
        )
        db.session.add(music_post)
        # db.session.commit()
        db.session.flush()

        # Upload image
        try:
            form_image = request.files['image']
            image_upload_success = user_upload(
                form_image, f"images/music/{music_post.id}")
            if image_upload_success:
                music_post.image = f'https://audio-shrub.s3.amazonaws.com/images/music/{music_post.id}'
            else:
                return {"errors": ["image failed to upload"]}
        except Exception as e:
            return {"errors": ['image failed to upload']}

        # validates song files for extension & total audio upload size BEFORE uploading
        ALLOWABLE_AUDIO_FILES = {'mp4', 'mp3', 'wav', 'mp4a'}

        for x in range(0, int(num_songs)):
            # error_list = []

            # checks audio file extension
            form_song = request.files[f"song-{x}"]
            song_extension = form_song.filename.split(".").pop()
            if song_extension.lower() not in ALLOWABLE_AUDIO_FILES:
                error_list.append("audio file type not allowed")
                # suboptimal return. should collect all errors first
                return {"errors": error_list}

            song = Song(
                title=form_song.filename,
                music_post_id=music_post.id,
            )
            db.session.add(song)
            db.session.flush()

            upload_success = user_upload(form_song, f"song/{song.id}")
            if upload_success:
                song.url = f"https://audio-shrub.s3.amazonaws.com/song/{song.id}"
            else:
                return {"errors": "song upload failed"}
        db.session.commit()
        return {"id": music_post.id}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@upload_routes.route('/merch', methods=['POST'])
def upload_merch_post():
    # content size validation
    form_image = request.files['image']
    if request.content_length / (1024*1024) > 0:
        return {"errors": ["upload size exceeds 15Mb"]}

    # form input validation
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

        # try upload image
        form_image = request.files['image']
        try:
            upload_success = user_upload(
                request.files['image'], f"images/merch/{merch_post.id}")
            if not upload_success:
                return {'errors': ['image failed to upload']}
            else:
                merch_post.image = f'https://audio-shrub.s3.amazonaws.com/images/merch/{merch_post.id}'
                db.session.commit()
                return {'id': merch_post.id}
        except:
            return {'errors': 'image failed to upload'}
        return {"id": merch_post.id}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
