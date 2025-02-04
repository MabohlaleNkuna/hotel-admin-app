import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../../src/firebaseConfig.js';

// Fetch all reviews
export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
  const snapshot = await getDocs(collection(db, 'reviews'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

// Fetch reviews for a specific room
export const fetchReviewsForRoom = createAsyncThunk('reviews/fetchReviewsForRoom', async (roomId) => {
  const q = query(collection(db, 'reviews'), where('roomId', '==', roomId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

// Remove review
export const removeReview = createAsyncThunk('reviews/removeReview', async (reviewId) => {
  await deleteDoc(doc(db, 'reviews', reviewId));
  return reviewId;
});

// Add review
export const addReview = createAsyncThunk('reviews/addReview', async (reviewData) => {
  const docRef = await addDoc(collection(db, 'reviews'), reviewData);
  return { id: docRef.id, ...reviewData };
});

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: { reviews: [], loading: false, error: null },
  extraReducers: builder => {
    builder
      .addCase(fetchReviews.pending, state => { state.loading = true; })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchReviewsForRoom.pending, state => { state.loading = true; })
      .addCase(fetchReviewsForRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsForRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(review => review.id !== action.payload);
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      });
  }
});

export default reviewsSlice.reducer;
