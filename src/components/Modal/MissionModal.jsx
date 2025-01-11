import React from 'react';

const MissionModal = ({ isOpen, onClose, onGenerateData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-lg shadow-lg p-6">
      
        <h2 className="text-lg font-semibold text-gray-800">Mission Creation</h2>

        <hr className="my-4 border-gray-300 shadow-sm" />

        <h3 className="text-base font-medium text-gray-700">Waypoint Navigation</h3>

        <div className="border-2 border-dotted border-gray-400 bg-gray-50 text-gray-600 text-sm p-4 my-4 rounded">
          Click on the map to mark points of the route and press enter to complete the route.
        </div>

        <hr className="my-4 border-gray-300 shadow-sm" />

        <div className="flex justify-end">
          <button
            onClick={onGenerateData}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            Generate Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionModal;
