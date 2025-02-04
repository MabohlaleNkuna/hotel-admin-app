// bookingSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig.js'; 

export const fetchBookings = createAsyncThunk('booking/fetchBookings', async () => {
  const bookingsRef = collection(db, 'bookings');
  const snapshot = await getDocs(bookingsRef);
  const bookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return bookings;
});

export const deleteBooking = createAsyncThunk('booking/deleteBooking', async (id) => {
  await deleteDoc(doc(db, 'bookings', id));
  return id;
});

export const updateBooking = createAsyncThunk('booking/updateBooking', async (booking) => {
  const { id, ...updateData } = booking;
  await updateDoc(doc(db, 'bookings', id), updateData);
  return booking;
});

export const bookRoomRequest = createAsyncThunk('booking/bookRoomRequest', async ({ room, checkIn, checkOut, token }) => {
  const booking = {
    room,
    checkIn,
    checkOut,
    token,
    userId: auth.currentUser?.uid, 
    date: new Date().toISOString()
  };
  await addDoc(collection(db, 'bookings'), booking);
  return booking;
});

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    bookings: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(booking => booking.id !== action.payload);
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        const index = state.bookings.findIndex(booking => booking.id === action.payload.id);
        if (index >= 0) {
          state.bookings[index] = action.payload;
        }
      });
  }
});

export default bookingSlice.reducer;
