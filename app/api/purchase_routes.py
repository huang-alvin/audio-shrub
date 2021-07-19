import os
import stripe
from flask_cors import cross_origin
from flask import Blueprint, request, redirect
from ..models import db, My_Collection

purchase_routes = Blueprint('purchase', __name__)
STRIPE_SECRET_KEY = os.environ.get('STRIPE_SECRET_KEY')
stripe.api_key = STRIPE_SECRET_KEY

# testing stripe api


@purchase_routes.route('/')
def make_purchase():
    payment_intent = stripe.PaymentIntent.create(
        amount=1000,
        currency='usd',
        payment_method_types=['card'],
        receipt_email='',
    )
    # print(payment_intent, '===')
    return {'success': 'success'}


@purchase_routes.route('/create-checkout-session', methods=['POST'])
@cross_origin(origin='*')
def create_checkout_session():
    # data = request.get_json(force=True)

    image = request.form['image']
    title = request.form['title']
    post_id = request.form['postId']
    user_id = request.form['userId']
    post_type = request.form['type']
    owner_id = request.form['ownerId']

    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price_data': {
                        'currency': 'usd',
                        'unit_amount': 50,
                        'product_data': {
                            'name': title,
                            'images': [image],
                        },
                    },
                    'quantity': 1,
                },
            ],
            mode='payment',
            success_url=f'https://audio-shrub.herokuapp.com/users/{owner_id}/{post_type}-post/{post_id}' + '?success=true',
            cancel_url=f'https://audio-shrub.herokuapp.com/users/{owner_id}/{post_type}-post/{post_id}' + '?canceled=true'
        )
    except Exception as e:
        return {'error': 'failed to purchase'}
    return redirect(checkout_session.url, code=303)
    # if "success" in checkout_session.url:
    #     collection_item = None
    #     if post_type == "music":
    #         collection_item = My_Collection(
    #             music_post_id=post_id, user_id=user_id)
    #     else:
    #         collection_item = My_Collection(
    #             merchandise_id=post_id, user_id=user_id)
    #     db.session.add(collection_item)
    #     db.session.commit()
