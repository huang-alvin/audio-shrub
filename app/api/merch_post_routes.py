from flask import Blueprint, request
from ..models import db, Merchandise

merch_post_routes = Blueprint('merch_post', __name__)

@merch_post_routes.route("/users/<int:userId>")
def get_user_merch_posts(userId):
    merch_posts_query = Merchandise.query.filter(Merchandise.user_id == userId).all()
    merch_list = []
    for merch_post in merch_posts_query:
        merch_obj = merch_post.to_dict()
        merch_list.append(merch_obj)
    return {"merchPosts":merch_list}

@merch_post_routes.route("/<int:merchPostId>")
def get_single_merch_post(merchPostId):
    merch_post_query = Merchandise.query.get(merchPostId)
    return {"merchPost":merch_post_query.to_dict()}
