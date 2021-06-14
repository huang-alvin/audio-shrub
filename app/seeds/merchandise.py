from app.models import db, Merchandise, User
from .utils import merch_image_list
from faker import Faker
import random

faker = Faker()
Faker.seed(0)
# Adds a demo user, you can add other users here if you want
def seed_merchandise():

    price_list = [0,5,10,15]

    for user_id in range(1,30):
        num_merchandise = random.randint(2,5)

        for x in range(1,num_merchandise):
            num_words = random.randint(3,6)
            num_sentences = random.randint(3,6)
            title_words = faker.words(nb=num_words)

            joinedSentences = " ".join(faker.sentences(nb=num_sentences))

            merch = Merchandise(
                user_id = user_id,
                title = "".join(title_words),
                description = joinedSentences,
                price= random.choice(price_list),
                image= random.choice(merch_image_list)
            )
            db.session.add(merch)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_merchandise():
    db.session.execute('TRUNCATE merchandise RESTART IDENTITY CASCADE;')
    db.session.commit()
