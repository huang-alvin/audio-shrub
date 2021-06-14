from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FileField, TextAreaField, MultipleFileField
from wtforms.validators import DataRequired, ValidationError, NumberRange
from flask_wtf.file import FileRequired, FileAllowed

ALLOWED_EXTENSIONS_AUDIO = {'mp4', 'mp3', 'wav', 'mp4a'}
ALLOWED_EXTENSIONS_IMAGE = {'jpeg', 'png', 'jpg'}

# not reaching this
# def image_filesize(form, field):
#     MAX_BYTES = 1 * (1024*1024)
#     print('inside imgae validator', field.data.read(), '='*20)
#     if len(field.data.read() > MAX_BYTES):
#         raise ValidationError(f"image file size must be less than {MAX_BYTES}Mb")

# render_kw={"multiple":True} future: try this again to get access to multiple file input
class MusicForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    price = IntegerField('price', validators=[DataRequired(), NumberRange(min=0)])
    image = FileField('image', validators=[FileRequired(), FileAllowed(ALLOWED_EXTENSIONS_IMAGE)])
    song0 = FileField('song', validators=[FileRequired(), FileAllowed(ALLOWED_EXTENSIONS_AUDIO)])
