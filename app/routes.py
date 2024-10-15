from flask import Blueprint, jsonify, request
from .models import db, User, Movie, Review, WatchlistItem

api = Blueprint('api', __name__)

@api.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'POST':
        # Create new user
        pass
    else:
        # Get all users
        pass

@api.route('/movies', methods=['GET', 'POST'])
def movies():
    if request.method == 'POST':
        # Create new movie
        pass
    else:
        # Get all movies
        pass

@api.route('/reviews', methods=['GET', 'POST'])
def reviews():
    if request.method == 'POST':
        # Create new review
        pass
    else:
        # Get all reviews
        pass

@api.route('/reviews/<int:review_id>', methods=['GET', 'PUT', 'DELETE'])
def review(review_id):
    # Get, update, or delete a specific review
    pass

@api.route('/watchlist', methods=['GET', 'POST'])
def watchlist():
    if request.method == 'POST':
        # Add movie to watchlist
        pass
    else:
        # Get user's watchlist
        pass
