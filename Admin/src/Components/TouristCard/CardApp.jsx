import React, { useState } from 'react';
import AdminPanel from './AdminPanel';
import TouristList from './TouristList';

const CardApp = () => {
  const [showTouristList, setShowTouristList] = useState(false);

  // Function to handle form submission and toggle TouristList visibility
  const handleFormSubmit = () => {
    setShowTouristList(true); // Show the TouristList component
  };

  return (
    <>
      <div>
        {/* Pass the handleFormSubmit function as a prop to AdminPanel */}
        <AdminPanel onFormSubmit={handleFormSubmit} />
      </div>
      <div>
        {/* Render TouristList only if showTouristList is true */}
        {showTouristList && <TouristList />}
      </div>
    </>
  );
};

export default CardApp;
