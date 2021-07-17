from flask import Blueprint, request
from ..models import db, Music_Post, Song, Category, User

search_routes = Blueprint('search', __name__)


@search_routes.route('', methods=['POST'])
def get_search_res():
    search_query = Music_Post.query.join(User).filter(
        Music_Post.title.ilike(f'%{input}%')
        | User.username.ilike(f'%{input}%')).all()

    search_res = [music_post.to_dict() for music_post in search_query]

    return {"search_res":  search_res}


@search_routes.route("/reactive", methods=['POST'])
def get_reactive_search_res():
    input = request.get_json(force=True)

    search_query = Music_Post.query.join(User).filter(
        Music_Post.title.ilike(f'%{input}%')
        | User.username.ilike(f'%{input}%')).limit(5).all()

    search_res = [music_post.to_dict() for music_post in search_query]

    return {"search_res":  search_res}
