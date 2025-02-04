import React, { useEffect, useState } from 'react';  
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
import Register from './pages/admin/AdminRegisterPage.jsx';
import Login from './pages/admin/LoginPage.jsx';
import AdminNavbar from './components/AdminNavbar.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import ManageAccommodations from './pages/admin/ManageAccommodations.jsx';
import ManageRoom from './pages/admin/ManageRoom.jsx';
import ManageBookings from './pages/admin/ManageBookings.jsx';

//import ProfilePage from './pages/admin/AdminProfile.jsx';  

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route 
          path="/dashboard" 
          element={user ? (
            <>
              <AdminNavbar />
              <AdminDashboard />
            </>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route 
          path="/manage-accommodations" 
          element={user ? (
            <>
              <AdminNavbar />
              <ManageAccommodations />
            </>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route 
          path="/manage-rooms" 
          element={user ? (
            <>
              <AdminNavbar />
              <ManageRoom />
            </>
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route 
          path="/manage-bookings" 
          element={user ? (
            <>
              <AdminNavbar />
              <ManageBookings />
            </>
          ) : (
            <Navigate to="/login" />
          )}
        />
        

        {/*   <Route 
          path="/profile" 
          element={user ? (
            <>
              <AdminNavbar />
              <ProfilePage />
            </>
          ) : (
            <Navigate to="/login" />
          )}
        /> */}
     

        {/* Default route */}
        <Route 
          path="/" 
          element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
