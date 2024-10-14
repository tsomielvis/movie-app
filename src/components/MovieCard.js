import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.imageUrl} alt={movie.title} />
      <div className="movie-info">
        <h3>{movie.title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
