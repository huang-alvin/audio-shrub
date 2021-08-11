import os
import stripe
from flask import Blueprint, request, redirect
from ..models import db, My_Collection

webhook_routes = Blueprint('webhook', __name__)
STRIPE_SECRET_KEY = os.environ.get('STRIPE_SECRET_KEY')
WEBHOOK_SIGNING_SECRET = os.environ.get('WEBHOOK_SIGNING_SECRET')
stripe.api_key = STRIPE_SECRET_KEY


@webhook_routes.route('/', methods=['POST'])
def successful_payment():
    endpoint_secret = "whsec_NwvzoSRBbntedhdo0WiljKQjrB5M0PPX"
    sig_header = request.headers['STRIPE_SIGNATURE']
    payload = request.get_data()
    # payload_2 = request.json
    # print(payload_2)
    # print(payload_2['type'])
    event = None
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        # Invalid payload
        print(e)
        return {'error': 'invalid payload'}, 400
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        print(e)
        return {'error': 'invalid signature'}, 400

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        print(session)
    # metadata = payload['data']['object']['metadata']
    # user_id = metadata['user_id']
    # post_type = metadata['post_type']
    # post_id = metadata['post_id']

    # if post_type == 'music':
    #     my_collection = My_Collection(music_post_id=post_id, user_id=user_id)
    # else:
    #     my_collection = My_Collection(merchandise_id=post_id, user_id=user_id)
    # db.session.add(my_collection)
    # db.session.commit()
    return {'success': 'success'}, 200
