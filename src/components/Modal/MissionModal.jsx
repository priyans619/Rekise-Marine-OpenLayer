import React from 'react';
import { FaTimes } from 'react-icons/fa';

const MissionModal = ({ isOpen, onClose, onGenerateData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-115 rounded-lg shadow-lg p-3 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-2 text-gray-300 hover:text-gray-900"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-lg font-bold text-gray-800">Mission Creation</h2>

        <hr className="my-2 border-gray-300 shadow-sm" />

        <h3 className="text-base font-medium text-gray-700">Waypoint Navigation</h3>

        <div className="border-2 border-dotted border-gray-400 bg-gray-200 text-gray-600 text-sm p-4 my-3 rounded">
          Click on the map to mark points of the route and then press ↵ to complete the route.
        </div>

        <hr className="my-4 border-gray-300 shadow-sm" />

        <div className="flex justify-end">
          <button
            onClick={onGenerateData}
            className="bg-violet-500 text-white px-4 py-2 rounded shadow"
          >
            Generate Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionModal;
