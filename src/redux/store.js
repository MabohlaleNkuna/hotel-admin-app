import { configureStore } from '@reduxjs/toolkit';
import accommodationsReducer from './accommodationsSlice.js';
import roomsReducer from './roomSlice.js';
import bookingSliceReducer from './bookingSlice.js';
import usersReducer from './usersSlice.js';
import reviewsReducer from './reviewsSlice.js';

const store = configureStore({
  reducer: {
    accommodations: accommodationsReducer, 
    rooms: roomsReducer,
    booking: bookingSliceReducer,
    user: usersReducer,
    reviews: reviewsReducer,
  },
});

export default store;
