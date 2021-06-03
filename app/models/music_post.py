from .db import db
from .tag import tags

class Music_Post(db.Model):
    __tablename__ = "music_posts"

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String, nullable=True)

    tags = db.relationship("Category", secondary=tags, back_populates="music_posts")
    songs = db.relationship("Song", backref="music_post", lazy="select")
