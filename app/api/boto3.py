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

def user_upload(file_object, object_name):

    try:
        response = s3_client.upload_fileobj(file_object, "audio-shrub", object_name, ExtraArgs={'ACL':'public-read'})
    except ClientError as e:
        print("ClientError",e)
        return False
    return True
