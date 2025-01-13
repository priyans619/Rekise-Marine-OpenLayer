import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { calculateDistance } from '../../utils/distance';

const PolygonModal = ({ isOpen, onClose, coordinates = [], onGenerateData }) => {
  if (!isOpen) return null;

  // Function to calculate the distance between two points
  const getDistance = (index) => {
    if (index === 0) return 0;
    return calculateDistance(coordinates[index - 1], coordinates[index]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-115 rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-lg font-bold text-gray-800">Polygon Creation</h2>

        <hr className="my-4 border-2 border-gray-300 shadow-sm" />

        {coordinates.length === 0 ? (
          <h3 className="text-base font-medium text-gray-700">No Coordinates Available</h3>
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
                  if (Array.isArray(coord) && coord.length === 2) {
                    const [latitude, longitude] = coord;
                    return (
                      <tr key={index} className="bg-gray-100 rounded-lg border-b border-2 border-gray-200">
                        <td className="px-4 py-2">{`${String(index + 1).padStart(2, '0')}`}</td>
                        <td className="px-4 py-2">
                          {`(${longitude.toFixed(8)}, ${latitude.toFixed(8)})`}
                        </td>
                        <td className="px-4 py-2">
                          {getDistance(index).toFixed(2)} m
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={index} className="bg-gray-100 rounded-lg border-b border-gray-300">
                      <td className="px-4 py-2">{`WP${String(index + 1).padStart(2, '0')}`}</td>
                      <td className="px-4 py-2">Invalid Coordinates</td>
                      <td className="px-4 py-2">-</td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        )}

        <hr className="my-5 border-gray-300 border-b shadow-sm" />

        <div className="flex justify-end">
          <button
            onClick={onGenerateData}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow"
          >
            Import Points
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolygonModal;
