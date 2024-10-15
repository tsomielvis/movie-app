const API_BASE_URL = 'http://localhost:5000/api';

export const getMovies = async () => {
  const response = await fetch(`${API_BASE_URL}/movies`);
  return response.json();
};

export const createReview = async (reviewData) => {
  const response = await fetch(`${API_BASE_URL}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewData),
  });
  return response.json();
};

// Add more API functions as needed
