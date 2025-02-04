import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings, deleteBooking, updateBooking } from '../../redux/bookingSlice';

const ManageBookings = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.booking.bookings);
  const status = useSelector((state) => state.booking.status);
  const error = useSelector((state) => state.booking.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBookings()); 
    }
  }, [dispatch, status]);

  const handleDelete = (id) => {
    dispatch(deleteBooking(id));
  };

  const handleUpdate = (booking) => {
    dispatch(updateBooking(booking)); 
  };

  if (status === 'loading') return <p>Loading bookings...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Manage Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <p><strong>Room:</strong> {booking.room.name}</p>
              <p><strong>Check-in:</strong> {booking.checkIn}</p>
              <p><strong>Check-out:</strong> {booking.checkOut}</p>
              <button onClick={() => handleUpdate(booking)}>Update</button>
              <button onClick={() => handleDelete(booking.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageBookings;
