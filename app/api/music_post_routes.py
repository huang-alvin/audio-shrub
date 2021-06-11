from flask import Blueprint, request
from ..models import db, Music_Post, Song, Category

music_post_routes = Blueprint('music_post', __name__)

@music_post_routes.route('/users/<int:userId>')
def get_user_music_posts(userId):
    music_posts_query = Music_Post.query.filter(Music_Post.user_id == userId).all()
    # print(music_posts_query,"="*50)
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

@music_post_routes.route('/<int:musicPostId>')
def get_single_music_post(musicPostId):
    music_post_query = Music_Post.query.get(musicPostId)

    music_post = music_post_query.to_dict()
    song_list = []
    category_list = []
    for song in music_post_query.songs:
        song_obj = song.to_dict()
        song_list.append(song_obj)
    for category in music_post_query.tags:
        category_list.append(category.to_dict())
    music_post["songs"] = song_list
    music_post["categories"] = category_list

    return {"musicPost":music_post}
