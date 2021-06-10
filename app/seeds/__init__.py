from flask.cli import AppGroup
from .users import seed_users, undo_users
from .music_posts import seed_music_posts, undo_music_posts
from .categories import seed_categories, undo_categories
from .songs import seed_songs, undo_songs
from .merchandise import seed_merchandise, undo_merchandise
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_categories()
    seed_merchandise()
    seed_music_posts()
    seed_songs()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_merchandise()
    undo_songs()
    undo_music_posts()
    undo_categories()
    undo_users()
    # Add other undo functions here
