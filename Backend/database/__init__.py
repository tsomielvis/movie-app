# database/__init__.py

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()  # Initialize the SQLAlchemy object
from .models import setup_database, User, Movie, Review, Watchlist
