from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FileField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, NumberRange
from flask_wtf.file import FileRequired, FileAllowed

ALLOWED_EXTENSIONS = {'jpeg', 'png', 'jpg'}


class MerchForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    price = IntegerField('price', validators=[
                         DataRequired(), NumberRange(min=0)])
    image = FileField('image', validators=[DataRequired(
    ), FileRequired(), FileAllowed(ALLOWED_EXTENSIONS)])
