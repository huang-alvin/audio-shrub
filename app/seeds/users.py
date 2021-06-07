from werkzeug.security import generate_password_hash
from app.models import db, User
from faker import Faker

# Adds a demo user, you can add other users here if you want
faker = Faker()
Faker.seed(0)
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
        User(username="Men I Trust", email=faker.email(),
                password='password',
                image="https://64.media.tumblr.com/b7fe0d404debb406f5d37bb50f73d53f/tumblr_inline_pdtre1sRrN1s9on4d_540.jpg"),

        ]
    # db.session.add(demo)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
