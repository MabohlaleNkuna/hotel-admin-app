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

  if (status === 'loading') return <p style={{ textAlign: 'center', fontSize: '18px' }}>Loading bookings...</p>;
  if (status === 'failed') return <p style={{ textAlign: 'center', fontSize: '18px', color: 'red' }}>Error: {error}</p>;

  return (
    <div style={{ padding: '30px', backgroundColor: '#F9F9F9', borderRadius: '10px', boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ color: '#004AAD', textAlign: 'center' }}>Manage Bookings</h2>
      {bookings.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '18px' }}>No bookings found.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {bookings.map((booking) => (
            <li key={booking.id} style={{ backgroundColor: '#FFFFFF', padding: '15px', marginBottom: '15px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <p><strong>Room:</strong> {booking.room.name}</p>
              <p><strong>Check-in:</strong> {booking.checkIn}</p>
              <p><strong>Check-out:</strong> {booking.checkOut}</p>
              <p><strong>User ID:</strong> {booking.userId}</p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
                <button onClick={() => handleUpdate(booking)} style={{ backgroundColor: '#004AAD', color: '#fff', padding: '10px 15px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Update</button>
                <button onClick={() => handleDelete(booking.id)} style={{ backgroundColor: '#FF5733', color: '#fff', padding: '10px 15px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageBookings;
