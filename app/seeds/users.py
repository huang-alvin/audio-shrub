from werkzeug.security import generate_password_hash
from app.models import db, User
from .utils import user_image_list
from faker import Faker
from datetime import datetime
import random

# Adds a demo user, you can add other users here if you want
faker = Faker()
Faker.seed(0)

# User(username="", email=faker.email(), password='password', image="")


def seed_users():
    user_batch = [
        User(username='Demo', email='demo@aa.io',
             password='password',
             image='https://audio-shrub.s3.amazonaws.com/seed/user/special-users/1.jpg',
             updated=datetime.now()),
        User(username="Men I Trust", email=faker.email(),
             password='password',
             image="https://audio-shrub.s3.amazonaws.com/seed/user/special-users/2.jpg",
             updated=datetime.now()),
        User(username="Covet", email=faker.email(),
             password='password',
             image="https://audio-shrub.s3.amazonaws.com/seed/user/special-users/3.png",
             updated=datetime.now()),
        User(username="Thundercat", email=faker.email(),
             password='password',
             image="https://audio-shrub.s3.amazonaws.com/seed/user/special-users/4.jpg",
             updated=datetime.now()),
        User(username="DOMi & JD Beck",
             email=faker.email(),
             password='password',
             image="https://audio-shrub.s3.amazonaws.com/seed/user/special-users/5.jpg",
             updated=datetime.now()),
        User(username="Nahre Sol",
             email=faker.email(),
             password='password',
             image="https://audio-shrub.s3.amazonaws.com/seed/user/special-users/6.jpg",
             updated=datetime.now()),
        User(username="CYNE",
             email=faker.email(),
             password='password',
             image="https://audio-shrub.s3.amazonaws.com/seed/user/special-users/7.jpg",
             updated=datetime.now()),
        User(username="Louis Cole",
             email=faker.email(),
             password='password',
             image="https://audio-shrub.s3.amazonaws.com/seed/user/special-users/8.png",
             updated=datetime.now()),
        User(username="AAAMYYY",
             email=faker.email(),
             password='password',
             image="https://audio-shrub.s3.amazonaws.com/seed/user/special-users/9.jpg",
             updated=datetime.now()),
        User(username="Tricot",
             email=faker.email(),
             password='password',
             image="https://audio-shrub.s3.amazonaws.com/seed/user/special-users/10.jpg",
             updated=datetime.now())
    ]
    for user in user_batch:
        db.session.add(user)

    user_batch_2 = []
    for x in range(0, 20):
        random_number = random.randint(0, len(user_image_list)-1)
        new_user = User(username=faker.name_nonbinary(),
                        email=faker.email(),
                        password='password',
                        image=user_image_list[random_number],
                        updated=datetime.now())
        db.session.add(new_user)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
