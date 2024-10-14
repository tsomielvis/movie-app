import React, { useState, useEffect } from 'react';
import { getWatchlist, deleteFromWatchlist } from '../api';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    getWatchlist(1).then(setWatchlist); // Assuming user with id 1
  }, []);

  const handleRemove = (id) => {
    deleteFromWatchlist(id).then(() => {
      setWatchlist(watchlist.filter(movie => movie.id !== id));
    });
  };

  return (
    <div className="watchlist">
      <h2>Your Watchlist</h2>
      <ul>
        {watchlist.map(movie => (
          <li key={movie.id}>
            {movie.title}
            <button onClick={() => handleRemove(movie.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
