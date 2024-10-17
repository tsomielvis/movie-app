from app import app, db
from models import User, Movie, Review, Watchlist
from datetime import datetime

# Sample data for seeding the database
def seed_data():
    # Create sample users
    user1 = User(username='john_doe', email='john@example.com')
    user1.set_password('password123')  # Hash the password
    user2 = User(username='jane_doe', email='jane@example.com')
    user2.set_password('password456')

    # Create sample movies
    movie1 = Movie(title='Inception', description='A thief who steals corporate secrets through the use of dream-sharing technology.', release_date=datetime(2010, 7, 16))
    movie2 = Movie(title='The Matrix', description='A computer hacker learns about the true nature of reality and his role in the war against its controllers.', release_date=datetime(1999, 3, 31))
    movie3 = Movie(title='Interstellar', description='A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', release_date=datetime(2014, 11, 7))

    # Create sample reviews
    review1 = Review(content='Amazing movie with a mind-bending plot!', rating=5, user=user1, movie=movie1)
    review2 = Review(content='A classic that redefined sci-fi!', rating=5, user=user2, movie=movie2)
    review3 = Review(content='Visually stunning but a bit long.', rating=4, user=user1, movie=movie3)

    # Create sample watchlists
    watchlist1 = Watchlist(user=user1, movie=movie1)
    watchlist2 = Watchlist(user=user2, movie=movie2)
    watchlist3 = Watchlist(user=user1, movie=movie3)

    # Add all instances to the session
    db.session.add(user1)
    db.session.add(user2)
    db.session.add(movie1)
    db.session.add(movie2)
    db.session.add(movie3)
    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(watchlist1)
    db.session.add(watchlist2)
    db.session.add(watchlist3)

    # Commit the session to the database
    db.session.commit()
    print("Database seeded!")

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create all tables if they don't exist
        seed_data()  # Seed the database with initial data
