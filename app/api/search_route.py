from flask import Blueprint, request
from ..models import db, Music_Post, Song, Category

search_routes = Blueprint('search_route', __name__)


@search_routes.route('', methods=['POST'])
def get_search_res():
    form = request.form
    search_result_list = []
    # search thru song.music_post
    return{"result": search_result_list}
