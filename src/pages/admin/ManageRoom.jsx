import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, addRoom, editRoom, deleteRoom } from '../../redux/roomSlice.js';
import { Button, Form, Col, Row } from 'react-bootstrap';

const ManageRoom = () => {
  const dispatch = useDispatch();
  const { list: rooms, loading, error } = useSelector((state) => state.rooms);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    capacity: '',
    price: '',
    amenities: '',
    roomType: '',
    imageFiles: [],
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'roomType') {
      updateAmenities(value);
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, imageFiles: Array.from(e.target.files) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await dispatch(editRoom({ id: editingId, updatedData: formData, imageFiles: formData.imageFiles }));
    } else {
      await dispatch(addRoom(formData));
    }

    setFormData({
      name: '',
      description: '',
      capacity: '',
      price: '',
      amenities: '',
      roomType: '',
      imageFiles: [],
    });
    setEditingId(null);
  };

  const handleEdit = (room) => {
    setFormData({
      name: room.name,
      description: room.description,
      capacity: room.capacity,
      price: room.price,
      amenities: room.amenities,
      roomType: room.roomType,
      imageFiles: [],
    });
    setEditingId(room.id);
  };

  const handleDelete = (id) => {
    dispatch(deleteRoom(id));
  };

  const updateAmenities = (roomType) => {
    let amenities = '';
    switch (roomType) {
      case 'Standard':
        amenities = 'Basic amenities, Free WiFi';
        break;
      case 'Deluxe':
        amenities = 'Enhanced amenities, Free WiFi, Mini-bar';
        break;
      case 'Suite':
        amenities = 'Luxurious amenities, Free WiFi, Mini-bar, Jacuzzi';
        break;
      default:
        amenities = '';
    }
    setFormData((prev) => ({ ...prev, amenities }));
  };

  // Inline styles
  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9',
    },
    header: {
      marginBottom: '20px',
      color: '#004AAD',
    },
    formGroup: {
      marginBottom: '15px',
    },
    formLabel: {
      color: '#004AAD',
      fontWeight: 'bold',
    },
    formControl: {
      border: '1px solid #004AAD',
      borderRadius: '5px',
    },
    formControlReadonly: {
      backgroundColor: '#e9ecef',
    },
    submitButton: {
      backgroundColor: '#004AAD',
      border: 'none',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    submitButtonHover: {
      backgroundColor: '#003d7a',
    },
    imagePreview: {
      marginTop: '10px',
    },
    imagePreviewImg: {
      marginRight: '10px',
      borderRadius: '5px',
    },
    errorMessage: {
      color: '#FF0000',
    },
    loadingMessage: {
      color: '#004AAD',
    },
    roomList: {
      marginTop: '20px',
    },
    roomItem: {
      borderBottom: '1px solid #ddd',
      padding: '10px 0',
      marginBottom: '10px',
    },
    roomItemTitle: {
      color: '#004AAD',
    },
    editButton: {
      backgroundColor: '#007bff',
      border: 'none',
      color: 'white',
      padding: '5px 10px',
      borderRadius: '5px',
      cursor: 'pointer',
      marginRight: '5px',
    },
    deleteButton: {
      backgroundColor: '#dc3545',
      border: 'none',
      color: 'white',
      padding: '5px 10px',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Manage Rooms</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} style={styles.formGroup}>
          <Form.Label column sm={2} style={styles.formLabel}>Name</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={styles.formControl}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} style={styles.formGroup}>
          <Form.Label column sm={2} style={styles.formLabel}>Description</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              style={{ ...styles.formControl, ...styles.formControlReadonly }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} style={styles.formGroup}>
          <Form.Label column sm={2} style={styles.formLabel}>Capacity</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              required
              style={styles.formControl}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} style={styles.formGroup}>
          <Form.Label column sm={2} style={styles.formLabel}>Price</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              style={styles.formControl}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} style={styles.formGroup}>
          <Form.Label column sm={2} style={styles.formLabel}>Amenities</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="amenities"
              value={formData.amenities}
              onChange={handleInputChange}
              readOnly
              style={{ ...styles.formControl, ...styles.formControlReadonly }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} style={styles.formGroup}>
          <Form.Label column sm={2} style={styles.formLabel}>Room Type</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="select"
              name="roomType"
              value={formData.roomType}
              onChange={handleInputChange}
              required
              style={styles.formControl}
            >
              <option value="">Select...</option>
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} style={styles.formGroup}>
          <Form.Label column sm={2} style={styles.formLabel}>Images</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="file"
              name="imageFiles"
              multiple
              onChange={handleFileChange}
              style={styles.formControl}
            />
          </Col>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={styles.submitButton}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.submitButtonHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.submitButton.backgroundColor}
        >
          {editingId ? 'Update Room' : 'Add Room'}
        </Button>
      </Form>

      {loading && <p style={styles.loadingMessage}>Loading...</p>}
      {error && <p style={styles.errorMessage}>Error: {error}</p>}
      <div style={styles.roomList}>
        {rooms.map((room) => (
          <div key={room.id} style={styles.roomItem}>
            <h3 style={styles.roomItemTitle}>{room.name}</h3>
            <p>{room.description}</p>
            <p>Capacity: {room.capacity}</p>
            <p>Price: R{room.price}</p>
            <p>Amenities: {room.amenities}</p>
            <p>Type: {room.roomType}</p>
            {room.imageUrls && room.imageUrls.length > 0 && (
              <div style={styles.imagePreview}>
                {room.imageUrls.map((url, index) => (
                  <img key={index} src={url} alt={`Room ${room.name}`} style={styles.imagePreviewImg} />
                ))}
              </div>
            )}
            <Button
              style={styles.editButton}
              onClick={() => handleEdit(room)}
            >
              Edit
            </Button>
            <Button
              style={styles.deleteButton}
              onClick={() => handleDelete(room.id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageRoom;
