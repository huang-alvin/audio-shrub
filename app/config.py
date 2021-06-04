import os

class Config:
  SECRET_KEY=os.environ.get('SECRET_KEY')
  SQLALCHEMY_TRACK_MODIFICATIONS=False
  SQLALCHEMY_DATABASE_URI=os.environ.get('DATABASE_URL')
  AWS_ACCESS_KEY_ID=os.environ.get("AWS_ACCESS_KEY_ID")
  AWS_SECRET_ACCESS_KEY=os.environ.get("OpjYAnwlgKrmYWUW4fLALundKtTroqRUCN3eg8Wn")

  SQLALCHEMY_ECHO=True
