from app.models import db, Category
# Adds a demo user, you can add other users here if you want

categoryList = ["rock", "pop", "math-rock", "alternative", "electronic", "chillwave",
                "shoegaze", "indie", "surf", "jazz", "dream-pop", "soul", "rap", "beats"]


def seed_categories():

    for category in categoryList:
        newCategory = Category(type=category)
        db.session.add(newCategory)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
