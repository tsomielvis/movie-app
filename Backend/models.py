from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship, declarative_base
import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    user_id = Column(Integer, primary_key=True)
    username = Column(String)
    email = Column(String, unique=True)
    password = Column(String, unique=True)

    reviews = relationship('Review', back_populates='user')
    watchlist = relationship('Watchlist', back_populates='user', uselist=False)

class Movie(Base):
    __tablename__ = 'movies'
    
    movie_id = Column(Integer, primary_key=True)
    title = Column(String)
    release_year = Column(Integer)
    genre = Column(String)
    synopsis = Column(String)

    reviews = relationship('Review', back_populates='movie')
    watchlists = relationship('Watchlist', back_populates='movie')

class Review(Base):
    __tablename__ = 'reviews'
    
    review_id = Column(Integer, primary_key=True)
    content = Column(String)
    rating = Column(Integer)
    user_id = Column(Integer, ForeignKey('users.user_id'))
    movie_id = Column(Integer, ForeignKey('movies.movie_id'))

    user = relationship('User', back_populates='reviews')
    movie = relationship('Movie', back_populates='reviews')

class Watchlist(Base):
    __tablename__ = 'watchlist'
    
    watchlist_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), unique=True)
    movie_id = Column(Integer, ForeignKey('movies.movie_id'), unique=True)
    added_at = Column(DateTime, default=datetime.datetime.utcnow)


def setup_database():
    engine = create_engine('sqlite:///database.db')  
    Base.metadata.create_all(engine)