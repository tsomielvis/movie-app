import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { addToWatchlist, postReview, getMovieDetails } from '../api';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);

  useEffect(() => {
    getMovieDetails(id).then(setMovie);
  }, [id]);

  const handleAddToWatchlist = () => {
    addToWatchlist({ movieId: movie.id, priority: 1 });
  };

  const handleReviewSubmit = () => {
    postReview({ content: review, rating, movie_id: movie.id, user_id: 1 });
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-details">
      <h2>{movie.title}</h2>
      <p>{movie.genre}</p>
      <p>{movie.description}</p>

      <button onClick={handleAddToWatchlist}>Add to Watchlist</button>

      <div className="review-section">
        <h3>Leave a Review</h3>
        <textarea value={review} onChange={(e) => setReview(e.target.value)} />
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          {[1, 2, 3, 4, 5].map(r => <option key={r} value={r}>{r} Stars</option>)}
        </select>
        <button onClick={handleReviewSubmit}>Submit Review</button>
      </div>
    </div>
  );
};

export default MovieDetails;
