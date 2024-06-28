import React from 'react';

function PopupNotification({ onClose, onLinkClick }) {
  const handleLinkClick = () => {
    onLinkClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-xl font-bold mb-4">People Section</h2>
        <p className="text-lg mb-4">This is a pop-up notification for the People section.</p>
        <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Close</button>
        <button onClick={handleLinkClick} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mt-4">Go to External Link</button>
      </div>
      
    </div>
  );
}

export default PopupNotification;
