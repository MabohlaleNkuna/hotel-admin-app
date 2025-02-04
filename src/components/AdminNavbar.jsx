import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { getAuth, signOut } from "firebase/auth";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const auth = getAuth();
 
  const handleLogout = () => {
   
    signOut(auth).then(() => {
      
    }).catch((error) => {
     // navigate('/login'); 
    });
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/dashboard">Admin Panel</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/manage-accommodations">Manage Accommodations</Nav.Link>
          <Nav.Link as={Link} to="/manage-rooms">Manage Rooms</Nav.Link>
          <Nav.Link as={Link} to="/manage-bookings">Manage Bookings</Nav.Link>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminNavbar;
