from .db import db

class My_Collection(db.Model):
    __tablename__ = "my_collections"

    id = db.Column(db.Integer, primary_key = True)
    merchandise_id = db.Column(db.Integer, nullable=True)
    song_id = db.Column(db.Integer, db.ForeignKey("songs.id"), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
