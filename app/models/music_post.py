from .db import db
from .tag import tags
from .song import Song
from .category import Category


class Music_Post(db.Model):
    __tablename__ = "music_posts"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String(600), nullable=True)
    by = db.Column(db.String(40), nullable=True)

    tags = db.relationship("Category", secondary=tags,
                           back_populates="music_posts")
    songs = db.relationship("Song", backref="music_post", lazy="dynamic")

    def to_dict(self):
        return{
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "description": self.description,
            "price": self.price,
            "image": self.image
        }
