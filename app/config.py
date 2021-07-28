import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    AWS_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")
    SQLALCHEMY_ECHO = True
    STRIPE_SECRET_KEY = os.environ.get('STRIPE_SECRET_KEY')
    WEBHOOK_SIGNING_SECRET = os.environ.get('WEBHOOK_SIGNING_SECRET')
    # MAX_CONTENT_LENGTH = 10 * (1024 * 1024) # in Mb
    # UPLOAD_EXTENSIONS= ['.jpg', '.jpeg','.png','.mp3','.mp4','.mp4a','.wav']
