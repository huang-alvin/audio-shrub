import boto3
from botocore.exceptions import ClientError
# from app.config import Config
import os

AWS_ACCESS_KEY_ID=os.environ.get("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY=os.environ.get("AWS_SECRET_ACCESS_KEY")
s3_client = boto3.client(
    's3',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY
    )
boto3.set_stream_logger(name="s3_client", level=10)
#bucket name : audio-shrub

def upload_user_music(file_object, object_name):
    print("="*30,Config.AWS_SECRET_ACCESS_KEY,Config.AWS_ACCESS_KEY_ID )
    try:
        print(Config.AWS_SECRET_ACCESS_KEY,Config.AWS_ACCESS_KEY_ID )
        response = s3_client.upload_fileobj(file_object, "audio-shrub", object_name)
    except ClientError as e:
        # logging.error(e)
        print(e)
        return False
    return True
