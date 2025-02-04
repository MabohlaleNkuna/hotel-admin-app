import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccommodations } from '../../redux/accommodationsSlice';
import { fetchRooms } from '../../redux/roomSlice';

// Inline styles
const styles = {
  dashboardContainer: {
    backgroundColor: '#f8f9fa',
    color: '#333',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '1200px',
    margin: 'auto',
  },
  dashboardTitle: {
    color: '#004aad',
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '2rem',
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  list: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    padding: '15px 0',
    transition: 'background-color 0.3s',
  },
  listItemHover: {
    backgroundColor: '#f1f1f1',
  },
  lastListItem: {
    borderBottom: 'none',
  },
  image: {
    width: '120px',
    height: '90px',
    objectFit: 'cover',
    borderRadius: '6px',
    marginRight: '20px',
  },
  details: {
    flex: '1',
  },
  loading: {
    textAlign: 'center',
    fontSize: '20px',
    color: '#004aad',
  },
  error: {
    textAlign: 'center',
    fontSize: '20px',
    color: '#e74c3c',
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    margin: '10px 0',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#004aad',
    color: '#ffffff',
    fontSize: '16px',
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'none',
  },
  buttonHover: {
    backgroundColor: '#003a8c',
  },
};

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { list: accommodations, loading: accommodationsLoading, error: accommodationsError } = useSelector((state) => state.accommodations);
  const { list: rooms, loading: roomsLoading, error: roomsError } = useSelector((state) => state.rooms);

  useEffect(() => {
    dispatch(fetchAccommodations());
    dispatch(fetchRooms());
  }, [dispatch]);

  if (accommodationsLoading || roomsLoading) return <p style={styles.loading}>Loading...</p>;
  if (accommodationsError || roomsError) return <p style={styles.error}>Error: {accommodationsError || roomsError}</p>;

  return (
    <div style={styles.dashboardContainer}>
      <h2 style={styles.dashboardTitle}>Admin Dashboard</h2>
      
      <section style={styles.section}>
        <h3 style={{ color: '#004aad', borderBottom: '2px solid #004aad', paddingBottom: '10px', marginBottom: '20px' }}>Accommodations</h3>
        <ul style={styles.list}>
          {accommodations.map(accommodation => (
            <li
              key={accommodation.id}
              style={{ ...styles.listItem, ...(accommodations.indexOf(accommodation) === accommodations.length - 1 ? styles.lastListItem : {}), transition: 'background-color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f1f1f1'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
            >
              <img src={accommodation.mainImage} alt={`Image of ${accommodation.name}`} style={styles.image} />
              <div style={styles.details}>
                <h4>{accommodation.name}</h4>
                <p>{accommodation.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section style={styles.section}>
        <h3 style={{ color: '#004aad', borderBottom: '2px solid #004aad', paddingBottom: '10px', marginBottom: '20px' }}>Rooms</h3>
        <ul style={styles.list}>
          {rooms.map(room => (
            <li
              key={room.id}
              style={{ ...styles.listItem, ...(rooms.indexOf(room) === rooms.length - 1 ? styles.lastListItem : {}), transition: 'background-color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f1f1f1'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
            >
              <div style={styles.details}>
                <h4>{room.name}</h4>
                <p>{room.description}</p>
               
              </div>
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
};

export default AdminDashboard;
