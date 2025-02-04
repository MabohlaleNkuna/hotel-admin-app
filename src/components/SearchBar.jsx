import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
      <input
        type="text"
        placeholder="Search rooms by type..."
        value={searchTerm}
        onChange={handleInputChange}
        style={{
          padding: '10px',
          width: '80%',
          maxWidth: '400px',
          borderRadius: '8px',
          border: '1px solid #004AAD',
          boxShadow: '0 2px 4px rgba(0, 0, 255, 0.2)', // Updated color
          outline: 'none',
          transition: 'box-shadow 0.3s ease',
        }}
        onFocus={(e) => (e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 255, 0.4)')}
        onBlur={(e) => (e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 255, 0.2)')}
      />
    </div>
  );
};

export default SearchBar;
