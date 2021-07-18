import os
import stripe
from flask import Blueprint, request, redirect

purchase_routes = Blueprint('purchase', __name__)
STRIPE_SECRET_KEY = os.environ.get('STRIPE_SECRET_KEY')
stripe.api_key = STRIPE_SECRET_KEY


@purchase_routes.route('/')
def make_purchase():
    payment_intent = stripe.PaymentIntent.create(
        amount=1000,
        currency='usd',
        payment_method_types=['card'],
        receipt_email='timeforchow@gmail.com',
    )
    # print(payment_intent, '===')
    return {'success': 'success'}


@purchase_routes.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    # to do change hardcoded data: img, unit amount, name
    data = request.get_json(force=True)
    print(data)
    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price_data': {
                        'currency': 'usd',
                        'unit_amount': 50,
                        'product_data': {
                            'name': 'Stubborn Attachments',
                            'images': ['https://i.imgur.com/EHyR2nP.png'],
                        },
                    },
                    'quantity': 1,
                },
            ],
            mode='payment',
            # TO DO CHANGE URL'S BELOW
            success_url="https://localhost/3000/users/1/music-post/1" + '?success=true',
            cancel_url="https://localhost/3000/users/1/music-post/1"
        )
        #  + '?canceled=true',
    except Exception as e:
        print(e)
        return {'error': 'failed to purchase'}
    # maybe do the redirection
    return redirect(checkout_session.url, code=303)
