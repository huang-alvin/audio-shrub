from app.models import db, My_Collection, User
# Adds a demo user, you can add other users here if you want


def seed_collections():

    demo_user = User.query.get(1)
    for x in range(10, 20):
        collection_item = My_Collection(
            music_post_id=x,
            user_id=1
        )
        db.session.add(collection_item)
    for x in range(10, 15):
        collection_item = My_Collection(
            merchandise_id=x,
            user_id=1
        )
        db.session.add(collection_item)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_collections():
    db.session.execute('TRUNCATE collections RESTART IDENTITY CASCADE;')
    db.session.commit()
