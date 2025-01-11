import React from 'react';
import { FaTimes } from 'react-icons/fa';

const MissionModal = ({ isOpen, onClose, coordinates = [], onGenerateData }) => {
  if (!isOpen) return null;

  // calculate distance between two points in meters
  const calculateDistance = (coord1, coord2) => {
    const R = 6371e3; 
    const lat1 = (coord1[1] * Math.PI) / 180;
    const lat2 = (coord2[1] * Math.PI) / 180;
    const deltaLat = ((coord2[1] - coord1[1]) * Math.PI) / 180;
    const deltaLon = ((coord2[0] - coord1[0]) * Math.PI) / 180;

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-lg font-semibold text-gray-800">Mission Creation</h2>

        <hr className="my-4 border-gray-300 shadow-sm" />

        
        {/* Conditional rendering */}
        {coordinates.length === 0 ? (
          <h3 className="text-base font-medium text-gray-700">Waypoint Navigation</h3>

        ) : (
          <div className="overflow-auto max-h-48 mt-4">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">WP</th>
                  <th className="px-4 py-2 text-left">Coordinates</th>
                  <th className="px-4 py-2 text-left">Distance (m)</th>
                </tr>
              </thead>
              <tbody>
                {coordinates.map((coord, index) => {
                  const distance =
                    index === 0 ? 0 : calculateDistance(coordinates[index - 1], coord);
                  return (
                    <tr key={index}>
                      <td className="px-4 py-2">{`WP${String(index + 1).padStart(2, '0')}`}</td>
                      <td className="px-4 py-2">
                        {`(${coord[1]?.toFixed(8) || 0}, ${coord[0]?.toFixed(8) || 0})`}
                      </td>
                      <td className="px-4 py-2">{distance.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
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
