import React, { useEffect } from 'react';  
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccommodations } from '../../redux/accommodationsSlice';
import { fetchRooms } from '../../redux/roomSlice';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { list: accommodations, loading: accommodationsLoading, error: accommodationsError } = useSelector((state) => state.accommodations);
  const { list: rooms, loading: roomsLoading, error: roomsError } = useSelector((state) => state.rooms);

  useEffect(() => {
    dispatch(fetchAccommodations());
    dispatch(fetchRooms());
  }, [dispatch]);

  if (accommodationsLoading || roomsLoading) return <p>Loading...</p>;
  if (accommodationsError || roomsError) return <p>Error: {accommodationsError || roomsError}</p>;

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Room Occupancy',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgba(0, 74, 173, 0.7)',
        fill: false,
      },
    ],
  };

  // Group rooms by roomType
  const roomCategories = rooms.reduce((acc, room) => {
    if (!acc[room.roomType]) {
      acc[room.roomType] = [];
    }
    acc[room.roomType].push(room);
    return acc;
  }, {});

  return (
    <div className="container my-5 p-4 bg-light rounded shadow">
      <h2 className="text-center text-primary mb-4">Admin Dashboard</h2>

      <section className="mb-4 p-3 bg-white rounded shadow-sm">
        <h3 className="text-primary border-bottom pb-2 mb-3">Accommodations</h3>
        <div className="row">
          {accommodations.map((accommodation) => (
            <div key={accommodation.id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <img src={accommodation.mainImage} alt={`Image of ${accommodation.name}`} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{accommodation.name}</h5>
                  <p className="card-text">{accommodation.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-4 p-3 bg-white rounded shadow-sm">
        <h3 className="text-primary border-bottom pb-2 mb-3">Rooms</h3>
        {Object.keys(roomCategories).map((roomType) => (
          <div key={roomType} className="mb-4">
            <h4 className="text-primary">{roomType} Rooms</h4>
            <div className="row">
              {roomCategories[roomType].map((room) => (
                <div key={room.id} className="col-md-4 mb-4">
                  <div className="card shadow-sm">
                    <img src={room.imageUrls[0]} alt={`Image of ${room.name}`} className="card-img-top" />
                    <div className="card-body">
                      <h5 className="card-title">{room.name}</h5>
                      <p className="card-text">{room.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mb-4 p-3 bg-white rounded shadow-sm">
        <h3 className="text-primary border-bottom pb-2 mb-3">Room Occupancy Trends</h3>
        <Line data={chartData} />
      </section>

      <div className="text-center">
        <a href="#" className="btn btn-primary px-5 py-2">Manage Rooms</a>
      </div>
    </div>
  );
};

export default AdminDashboard;
