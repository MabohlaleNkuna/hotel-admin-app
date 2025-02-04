import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest, registerSuccess, registerFailure } from '../../redux/usersSlice.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig.js';
import { Link } from 'react-router-dom';
import { setDoc, doc } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminRegisterPage() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const addUserToFirestore = async (userCredential) => {
    const { uid, email } = userCredential.user;
    await setDoc(doc(db, 'users', uid), {
      email,
      role: 'admin', // Role hardcoded as 'admin'
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    dispatch(registerRequest());

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(registerSuccess({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      }));

      await addUserToFirestore(userCredential);
      setSuccessMessage('Admin registered successfully!');
    } catch (error) {
      dispatch(registerFailure(error.message));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="card-title text-center mb-4">Admin Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input 
              type="password" 
              placeholder="Confirm Password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              className="form-control"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-100 mb-3"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
          {error && <p className="text-danger text-center">{error}</p>}
          {successMessage && <p className="text-success text-center">{successMessage}</p>}
        </form>
        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default AdminRegisterPage;
