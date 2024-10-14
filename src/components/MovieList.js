import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ category }) => {
  return (
    <section className="movie-list">
      <h2>{category.name}</h2>
      <div className="movie-row">
        {category.movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieList;