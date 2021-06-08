from flask import Blueprint, request
from ..models import db, Music_Post, Song, Category

music_post_routes = Blueprint('music_post', __name__)

@music_post_routes.route('/<int:userId>')
def get_music_posts_by_user_id(userId):
    music_posts_query = Music_Post.query.filter(Music_Post.user_id == userId).all()

    music_list = []
    for music_post in music_posts_query:
        song_list = []
        category_list = []
        music_obj = music_post.to_dict()
        for song in music_post.songs:
            song_obj = song.to_dict()
            song_list.append(song_obj)
        for category in music_post.tags:
            category_list.append(category.to_dict())
        music_obj["songs"] = song_list
        music_obj["categories"] = category_list
        music_list.append(music_obj)
    return {"musicPosts":music_list}
