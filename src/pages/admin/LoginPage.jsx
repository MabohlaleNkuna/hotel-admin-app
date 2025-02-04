import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure } from '../../redux/usersSlice.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig.js';
import { checkAdminStatus } from '../../utils/authUtils.js';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (!email || !password) {
      setValidationError('Email and Password are required');
      return;
    }

    dispatch(loginRequest());

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;
      const isAdmin = await checkAdminStatus(loggedInUser);

      dispatch(
        loginSuccess({
          uid: loggedInUser.uid,
          email: loggedInUser.email,
          role: isAdmin ? 'admin' : 'user',
        })
      );

      setSuccessMessage('User logged in successfully!');
      setTimeout(() => navigate(isAdmin ? '/dashboard' : '/'), 2000);
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
 
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="card-title text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
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
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-100 mb-3"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {validationError && <p className="text-danger text-center">{validationError}</p>}
          {error && <p className="text-danger text-center">{error}</p>}
          {successMessage && <p className="text-success text-center">{successMessage}</p>}
        </form>
        <p className="text-center mt-3">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
