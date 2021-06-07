from app.models import db, Music_Post, Song
from .utils import song_list
from faker import Faker
import random

faker = Faker()
Faker.seed(0)
# Adds a demo user, you can add other users here if you want
def seed_songs():

    all_music_posts = Music_Post.query.all()

    for music_post in all_music_posts:
        num_songs = random.randint(3,8)
        for x in num_songs:
            num_words = random.randint(3,6)
            song_title = faker.words(nb=num_words)
            song = Song(
                title="".join(song_title),
                url = random.choice(song_list),
                music_post_id=music_post.id)
            db.session.add(song)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_songs():
    db.session.execute('TRUNCATE songs RESTART IDENTITY CASCADE;')
    db.session.commit()
