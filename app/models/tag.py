from .db import db

tags = db.Table('tags',
    db.Column('category_id', db.Integer, db.ForeignKey("categories.id"), primary_key=True),
    db.Column('music_post_id', db.Integer, db.ForeignKey("music_posts.id"), primary_key=True)
)
