from flask_wtf import FlaskForm
from wtforms import FileField
from wtforms.validators import DataRequired, ValidationError
from flask_wtf.file import FileRequired, FileAllowed

ALLOWED_EXTENSIONS = {'jpeg', 'png', 'jpg'}


class ImageForm(FlaskForm):
    image = FileField('image', validators=[DataRequired(
    ), FileRequired(), FileAllowed(ALLOWED_EXTENSIONS)])
