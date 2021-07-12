from app.models import db, Category, User
# Adds a demo user, you can add other users here if you want

categoryList = ["rock", "pop", "math-rock", "alternative", "electronic", "chillwave",
                "shoegaze", "indie", "surf", "jazz", "dream-pop", "soul", "rap", "beats"]


def seed_collections():

    demo_user = User.query.get(1)
    for category in categoryList:
        newCategory = Category(type=category)
        db.session.add(newCategory)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_collections():
    db.session.execute('TRUNCATE collections RESTART IDENTITY CASCADE;')
    db.session.commit()