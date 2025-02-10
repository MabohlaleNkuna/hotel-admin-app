import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms, addRoom, editRoom, deleteRoom } from '../../redux/roomSlice.js';
import { Button, Form, Col, Row, Card, Container } from 'react-bootstrap';

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
        amenities = 'Luxurious amenities, Free WiFi, Mini-bar, Jacuzzi,King-sized bed,Air conditioning';
        break;
      default:
        amenities = '';
    }
    setFormData((prev) => ({ ...prev, amenities }));
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Manage Rooms</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm={6}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group controlId="formRoomType">
              <Form.Label>Room Type</Form.Label>
              <Form.Control
                as="select"
                name="roomType"
                value={formData.roomType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select...</option>
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Suite">Suite</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group controlId="formCapacity">
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group controlId="formAmenities">
              <Form.Label>Amenities</Form.Label>
              <Form.Control
                type="text"
                name="amenities"
                value={formData.amenities}
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Form.Group controlId="formImages">
              <Form.Label>Images</Form.Label>
              <Form.Control
                type="file"
                name="imageFiles"
                multiple
                onChange={handleFileChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="mt-3">
          {editingId ? 'Update Room' : 'Add Room'}
        </Button>
      </Form>

      {loading && <p className="text-primary mt-3">Loading...</p>}
      {error && <p className="text-danger mt-3">Error: {error}</p>}

      <h3 className="mt-4">Rooms</h3>
      <div>
        {['Standard', 'Deluxe', 'Suite'].map((roomType) => (
          <div key={roomType} className="mt-4">
            <h4>{roomType} Rooms</h4>
            <div className="row">
              {rooms
                .filter((room) => room.roomType === roomType)
                .map((room) => (
                  <div key={room.id} className="col-sm-4 mb-4">
                    <Card>
                      <Card.Img variant="top" src={room.imageUrls[0]} />
                      <Card.Body>
                        <Card.Title>{room.name}</Card.Title>
                        <Card.Text>{room.description}</Card.Text>
                        <Card.Text>
                          <strong>Price:</strong> R{room.price} <br />
                          <strong>Capacity:</strong> {room.capacity} people <br />
                          <strong>Amenities:</strong> {room.amenities}
                        </Card.Text>
                        <Button
                          variant="secondary"
                          onClick={() => handleEdit(room)}
                          className="mr-2"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(room.id)}
                        >
                          Delete
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ManageRoom;
