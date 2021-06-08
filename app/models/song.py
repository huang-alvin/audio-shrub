from .db import db

class Song(db.Model):
    __tablename__ = "songs"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    url = db.Column(db.String(600), nullable=True)
    music_post_id = db.Column(db.Integer,db.ForeignKey("music_posts.id"), nullable=False)

    def to_dict(self):
        return{
            "id": self.id,
            "title": self.title,
            "url": self.url,
            "music_post_id": self.music_post_id
        }
