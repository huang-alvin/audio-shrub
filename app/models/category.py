from .db import db

class Category(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key = True)
    type = db.Column(db.String(255), nullable=False, unique=True)
    user_id = db.Column(db.Integer,db.ForeignKey("users.id"), nullable=True)
