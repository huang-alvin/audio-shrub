import os
import stripe
from flask import Blueprint, request, redirect
from ..models import db, My_Collection, User, Music_Post, Merchandise

webhook_routes = Blueprint('webhook', __name__)
STRIPE_SECRET_KEY = os.environ.get('STRIPE_SECRET_KEY')
WEBHOOK_SIGNING_SECRET = os.environ.get('WEBHOOK_SIGNING_SECRET')
stripe.api_key = STRIPE_SECRET_KEY


@webhook_routes.route('/', methods=['POST'])
def successful_payment():
    payload = request.get_json()
    metadata = (payload['data']['object']['metadata']
    user_id=metadata['user_id']
    post_type=metadata['post_type']
    post_id=metadata['post_id']

    if post_type == 'music':
        # add music post to users collection
    else:
        # add merhc post to users collection
    return {'success': 'success'}, 200
