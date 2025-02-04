import React from 'react';

const MapComponent = () => {
  const getMapHeight = () => {
    if (window.innerWidth <= 480) {
      return '300px';
    } else if (window.innerWidth <= 768) {
      return '300px';}
      else if (window.innerWidth <= 1200) {
        return '400px';
    } else {
      return '5km00px';
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        textAlign: 'right',
        height: getMapHeight(),
        width: '250px',
        margin: 'auto',
        borderRadius: '0',
        overflow: 'hidden',
        boxShadow: 'none',
        marginTop: '0px',
        marginLeft: '2px',
      }}
    >
      <iframe
        width="100%"
        height="100%"
        id="gmap_canvas"
        src="https://maps.google.com/maps?q=phalaborwa&t=&z=13&ie=UTF8&iwloc=&output=embed"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        style={{
          border: 'none',
          borderRadius: '0',
        }}
        title="Google Map"
      ></iframe>
    </div>
  );
};

export default MapComponent;
