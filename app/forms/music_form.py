from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FileField, TextAreaField, MultipleFileField
from wtforms.validators import DataRequired, ValidationError, NumberRange
from flask_wtf.file import FileRequired, FileAllowed

ALLOWED_EXTENSIONS_AUDIO = {'mp4', 'mp3', 'wav', 'mp4a'}
ALLOWED_EXTENSIONS_IMAGE = {'jpeg', 'png', 'jpg'}


class MusicForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    price = IntegerField('price', validators=[DataRequired(), NumberRange(min=0)])
    image = FileField('image', validators=[FileRequired(), FileAllowed(ALLOWED_EXTENSIONS_IMAGE)])
    song0 = FileField('song', render_kw={"multiple":True} ,validators=[FileRequired(), FileAllowed(ALLOWED_EXTENSIONS_AUDIO)])
