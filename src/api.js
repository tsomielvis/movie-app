const API_URL = 'http://localhost:5000';

// Public movie fetch
export const searchMovies = async (query) => {
  const response = await fetch(`${API_URL}/movies/public?query=${query}`);
  return response.json();
};

// Fetch movie details
export const getMovieDetails = async (id) => {
  const response = await fetch(`${API_URL}/movies/${id}`);
  return response.json();
};

// Add to watchlist
export const addToWatchlist = async (data) => {
  await fetch(`${API_URL}/watchlist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
};

// Get watchlist
export const getWatchlist = async (userId) => {
  const response = await fetch(`${API_URL}/watchlist?user_id=${userId}`);
  return response.json();
};

// Delete from watchlist
export const deleteFromWatchlist = async (id) => {
  await fetch(`${API_URL}/watchlist/${id}`, { method: 'DELETE' });
};

// Post a review
export const postReview = async (review) => {
  await fetch(`${API_URL}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  });
};

// Get movie reviews
export const getMovieReviews = async (movieId) => {
  const response = await fetch(`${API_URL}/movies/${movieId}/reviews`);
  return response.json();
};
