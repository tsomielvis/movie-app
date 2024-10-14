import React from 'react';

const ReviewPage = () => {
  const reviews = [
    { id: 1, movieTitle: "Inception", review: "A mind-bending masterpiece that keeps you on the edge of your seat.", rating: 4.8 },
    { id: 2, movieTitle: "The Shawshank Redemption", review: "An inspiring tale of hope and perseverance. A true classic.", rating: 5 },
  ];

  return (
    <div className="review-page">
      <h1>Movie Reviews</h1>
      {reviews.map(review => (
        <div key={review.id} className="review-card">
          <h2>{review.movieTitle}</h2>
          <p>{review.review}</p>
          <div className="rating">Rating: {review.rating}/5</div>
        </div>
      ))}
    </div>
  );
};

export default ReviewPage;
