from flask_sqlalchemy import SQLAlchemy

# Initialize the database
db = SQLAlchemy()

# Define the User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'

# Define the Movie model (example)
class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    release_year = db.Column(db.Integer, nullable=False)
    genre = db.Column(db.String(100), nullable=True)

    def __repr__(self):
        return f'<Movie {self.title}>'

# Define the Review model (example)
class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=True)

    user = db.relationship('User', backref='reviews')
    movie = db.relationship('Movie', backref='reviews')

    def __repr__(self):
        return f'<Review {self.id} by User {self.user_id} for Movie {self.movie_id}>'

# Define the Watchlist model (example)
class Watchlist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'), nullable=False)

    user = db.relationship('User', backref='watchlists')
    movie = db.relationship('Movie', backref='watchlists')

    def __repr__(self):
        return f'<Watchlist {self.id} for User {self.user_id} Movie {self.movie_id}>'
