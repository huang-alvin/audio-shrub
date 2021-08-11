from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(600), nullable=True)
    updated = db.Column(db.DateTime(), nullable=False)

    my_collection = db.relationship("My_Collection", lazy="select")
    music_posts = db.relationship("Music_Post", lazy="joined")
    merch_posts = db.relationship("Merchandise", lazy="joined")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        music_list = []
        merch_list = []

        for music_post in self.music_posts:
            music_obj = music_post.to_dict()
            music_list.append(music_obj)
        for merch_post in self.merch_posts:
            merch_obj = merch_post.to_dict()
            merch_list.append(merch_obj)

        collection = [
            collection_item.music_post.to_dict() if collection_item.music_post
            else collection_item.merchandise.to_dict()
            for collection_item in self.my_collection]

        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "image": self.image,
            "music_posts": music_list,
            "merch_posts": merch_list,
            "collection": collection,
            "updated": self.updated
        }

    # def collection(self):
