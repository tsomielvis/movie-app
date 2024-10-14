import React from 'react';

const ReviewPage = () => {
  const reviews = [
    { id: 1, movieTitle: 'Movie Title 1', review: 'This is a great movie!', rating: 4.5 },
    { id: 2, movieTitle: 'Movie Title 2', review: 'Excellent plot and acting.', rating: 5 },
  ];

  return (
    <div>
      <h1>Movie Reviews</h1>
      {reviews.map(review => (
        <div key={review.id} className="review-card">
          <h2>{review.movieTitle}</h2>
          <p>{review.review}</p>
          <p>Rating: {review.rating}/5</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewPage;
