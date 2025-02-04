import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, removeReview } from '../../redux/reviewsSlice.js';

const ManageReviews = () => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector(state => state.reviews);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const handleDeleteReview = (reviewId) => {
    dispatch(removeReview(reviewId));
  };

  return (
    <div>
      <h2>Manage Reviews</h2>
      {loading && <p>Loading reviews...</p>}
      {error && <p>Error fetching reviews: {error}</p>}
      <div>
        {reviews.map(review => (
          <div key={review.id}>
            <p>{review.comment} - {review.rating} stars</p>
            <button onClick={() => handleDeleteReview(review.id)}>Delete Review</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageReviews;
