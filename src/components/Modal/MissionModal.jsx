import React, { useState } from 'react';
import { FaTimes, FaEllipsisV } from 'react-icons/fa';
import { calculateDistance } from '../../utils/distance';

const MissionModal = ({ isOpen, onClose, coordinates = [], onGenerateData }) => {
  const [dropdownIndex, setDropdownIndex] = useState(null);

  if (!isOpen) return null;

  // Function to calculate the total distance for each row
  const getDistance = (index) => {
    if (index === 0) return 0;
    return calculateDistance(coordinates[index - 1], coordinates[index]);
  };

  const handleDropdownToggle = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  const handleInsertPolygon = (position) => {
    console.log(`Insert Polygon ${position === 'Before' ? 'Before' : 'After'} waypoint ${coordinates[dropdownIndex]}`);
    
    // close the modal and insert the polygon
    setDropdownIndex(null);
    onClose();
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
                {coordinates.map((coord, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{`WP${String(index + 1).padStart(2, '0')}`}</td>
                    <td className="px-4 py-2">
                      {`(${coord[1]?.toFixed(8) || 0}, ${coord[0]?.toFixed(8) || 0})`}
                    </td>
                    <td className="px-4 py-2">
                      {getDistance(index).toFixed(2)} m
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDropdownToggle(index)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <FaEllipsisV size={18} />
                      </button>

                      {/* Dropdown Menu */}
                      {dropdownIndex === index && (
                        <div className="absolute bg-white border shadow-lg rounded mt-2 right-0 w-48">
                          <ul className="text-gray-700">
                            <li
                              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                              onClick={() => handleInsertPolygon('Before')}
                            >
                              Insert Polygon Before
                            </li>
                            <li
                              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                              onClick={() => handleInsertPolygon('After')}
                            >
                              Insert Polygon After
                            </li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
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
