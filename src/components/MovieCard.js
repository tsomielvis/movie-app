import React from 'react';
import './MovieCard.css'; // Link to custom CSS

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.imageUrl} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>Rating: {movie.rating} / 5</p>
      </div>
      <div className="overlay">
        <button className="watch-trailer-btn">Watch Trailer</button>
        <button className="add-watchlist-btn">Add to Watchlist</button>
      </div>
    </div>
  );
};

export default MovieCard;
