import React from 'react';
import './AuthForm.css'; 
import Buttons from './AccomodationDetail'; 

const AuthForm = ({ title, email, setEmail, password, setPassword, onSubmit, buttonText, error, successMessage }) => (
  <div className="auth-form">
    <h2>{title}</h2>
    <form onSubmit={onSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {/* Use Buttons component for the button */}
      <Buttons style={{ width: '100%', padding: '10px' }} onClick={onSubmit}>
        {buttonText}
      </Buttons>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">Error: {error}</p>}
    </form>
  </div>
);

export default AuthForm;
