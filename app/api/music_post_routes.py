from flask import Blueprint, request
from ..models import db, Music_Post, Song, Category
import random

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

# refactor for post_time. As of now, fetch queries are hard coded in
@music_post_routes.route('/new')
def get_new_music_post():
    new_music_posts = Music_Post.query.offset(4).limit(5).all()

    new_post_list = []
    for post in new_music_posts:
        post_obj = post.to_dict()
        new_post_list.append(post_obj)
    return {"newPosts" : new_post_list}


@music_post_routes.route('/featured')
def get_featured_music_post():
    featured_music_posts = Music_Post.query.limit(4).all()

    featured_post_list = []
    for post in featured_music_posts:
        post_obj = post.to_dict()
        featured_post_list.append(post_obj)
    return {"featuredPosts":featured_post_list}

# for now these will be randomly selected
# updating carousel feature is to be paused
@music_post_routes.route('selling-now')
def get_selling_now_posts():
    selling_now_post_list = []
    total_music_posts = Music_Post.query.count()

    procured_posts = set()
    while len(selling_now_post_list) < 8:
        random_id = random.randint(1,total_music_posts)
        if(random_id not in procured_posts):
            procured_posts.add(random_id)
            music_post = Music_Post.query.get(random_id)
            music_post_obj = music_post.to_dict()
            selling_now_post_list.append(music_post_obj)
        else:
            continue
    return{"sellingNowPosts": selling_now_post_list}
