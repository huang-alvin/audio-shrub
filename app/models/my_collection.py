from .db import db


class My_Collection(db.Model):
    __tablename__ = "my_collections"

    id = db.Column(db.Integer, primary_key=True)
    merchandise_id = db.Column(
        db.Integer, db.ForeignKey("merchandise.id"), nullable=True)
    music_post_id = db.Column(db.Integer, db.ForeignKey(
        "music_posts.id"), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    music_post = db.relationship("Music_Post", lazy="joined")
    merchandise = db.relationship("Merchandise", lazy="joined")
