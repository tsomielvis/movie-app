import React, { useState, useEffect } from 'react';
import { getWatchlist, deleteFromWatchlist, getRecommendations } from '../api';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    getWatchlist(1).then(setWatchlist); // Assuming user with id 1
    getRecommendations(1).then(setRecommendations); // Get movie recommendations
  }, []);

  const handleRemove = (id) => {
    deleteFromWatchlist(id).then(() => {
      setWatchlist(watchlist.filter(movie => movie.id !== id));
    });
  };

  return (
    <div className="watchlist-page">
      <h2>Your Watchlist</h2>
      <ul className="movie-list">
        {watchlist.map(movie => (
          <li key={movie.id}>
            <img src={movie.imageUrl} alt={movie.title} />
            <h3>{movie.title}</h3>
            <button onClick={() => handleRemove(movie.id)}>Remove</button>
            <button>Watch Trailer</button>
          </li>
        ))}
      </ul>

      <h2>Recommended for You</h2>
      <ul className="movie-list">
        {recommendations.map(movie => (
          <li key={movie.id}>
            <img src={movie.imageUrl} alt={movie.title} />
            <h3>{movie.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
