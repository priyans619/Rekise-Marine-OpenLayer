import React from "react";

const DrawButton = ({ onClick }) => {
  return (
    <button
      className="fixed bottom-4 right-4 bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
      onClick={onClick}
    >
      Draw on the Map
    </button>
  );
};

export default DrawButton;
