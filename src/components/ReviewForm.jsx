import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReview } from '../../src/redux/reviewsSlice.js'; // Updated import

const ReviewForm = ({ room, onClose }) => {
  const dispatch = useDispatch();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (rating === 0) {
      setSuccessMessage('Please select a rating.');
      return;
    }

    try {
      const reviewData = {
        roomId: room.id,
        review,
        rating,
        timestamp: new Date(),
      };

      await dispatch(addReview(reviewData)).unwrap();

      setSuccessMessage('Review submitted successfully!');
      setReview('');
      setRating(0);
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 2000);
    } catch (error) {
      setSuccessMessage('Failed to submit review. Please try again.');
    }
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Review for {room.name}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.starContainer}>
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              onClick={() => handleRating(index + 1)}
              style={index < rating ? styles.starSelected : styles.star}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
          style={styles.textarea}
          placeholder="Write your review here..."
        />
        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.button}>Submit Review</button>
          <button type="button" onClick={onClose} style={styles.button}>Close</button>
        </div>
        {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
      </form>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    backgroundColor: '#f0f8ff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '400px',
    margin: '0 auto',
  },
  heading: {
    color: '#004aad',
    textAlign: 'center',
    marginBottom: '15px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  starContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  star: {
    fontSize: '24px',
    cursor: 'pointer',
    color: '#ddd',
  },
  starSelected: {
    fontSize: '24px',
    cursor: 'pointer',
    color: '#f4c561',
  },
  textarea: {
    width: '100%',
    height: '100px',
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#004aad',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  successMessage: {
    color: '#004aad',
    textAlign: 'center',
    marginTop: '10px',
  },
};

export default ReviewForm;
