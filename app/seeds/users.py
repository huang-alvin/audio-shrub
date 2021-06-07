from werkzeug.security import generate_password_hash
from app.models import db, User
from .utils import user_image_list
from faker import Faker
import random

# Adds a demo user, you can add other users here if you want
faker = Faker()
Faker.seed(0)

# User(username="", email=faker.email(), password='password', image="")
def seed_users():
    user_batch = [
        User(username='Demo', email='demo@aa.io',
                password='password'),
        User(username="Men I Trust", email=faker.email(),
                password='password',
                image="https://64.media.tumblr.com/b7fe0d404debb406f5d37bb50f73d53f/tumblr_inline_pdtre1sRrN1s9on4d_540.jpg"),
        User(username="Covet", email=faker.email(),
                password='password',
                image="http://triplecrownrecords.com/uploads/attachments/cjepzf7ip09c998sa1jc7ekho-screen-shot-2018-03-13-at-2-17-27-pm.0.22.1150.718.full.png"),
        User(username="Thundercat", email=faker.email(),
                password='password',
                image="https://i.scdn.co/image/2de0565d544c3cbdd2517b724930bb0dcee6a1c8"),
        User(username="DOMi & JD Beck",
            email=faker.email(),
            password='password',
            image="https://musicfestnews.com/wp-content/uploads/2019/08/67921332_2574787059240046_2403628947708313600_o.jpg"),
        User(username="Nahre Sol",
            email=faker.email(),
            password='password',
            image="https://images.squarespace-cdn.com/content/v1/59a40a844c0dbf71dd64a15a/1587578719041-H1BA35KFVCS76DOLTTQ9/ke17ZwdGBToddI8pDm48kLl76CqolYQpYCK1tQUkpCVZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpzq3NVIIp6jYqnwxy-xF8aVXRy_AJKc5toB5m-gAPM7p7ivWsEabuWKGrHqsHOeNt4/image-asset.jpeg"),
        User(username="DOMi & JD Beck",
            email=faker.email(),
            password='password',
            image="https://musicfestnews.com/wp-content/uploads/2019/08/67921332_2574787059240046_2403628947708313600_o.jpg"),
        User(username="Louis Cole",
            email=faker.email(),
            password='password',
            image="https://i1.wp.com/coolhunting.com/wp-content/uploads/2019/03/louis-cole.png?fit=773%2C773&ssl=1"),
        User(username="AAAMYYY",
            email=faker.email(),
            password='password',
            image="https://yt3.ggpht.com/ytc/AAUvwngt4xxPnnQQXNqRtEi4y-sDYE38pW5Mcwm4rKnj-Q=s900-c-k-c0x00ffffff-no-rj"),
        User(username="Tricot",
            email=faker.email(),
            password='password',
            image="https://s9.limitedrun.com/images/1220731/v600_tricot2017_square_942.jpg")
        ]
    for user in user_batch:
        db.session.add(user)

    user_batch_2 = []
    for x in range(0,50):
        random_number = random.randint(0, user_image_list.len()-1)
        new_user = User(username=faker.name_nonbinary(),
            email=faker.email(),
            password='password',
            image=user_image_list[random_number])
        db.session.add(new_user)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
