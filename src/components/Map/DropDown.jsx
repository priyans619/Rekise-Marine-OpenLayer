import React from 'react';

const Dropdown = ({ index, dropdownIndex, toggleDropdown }) => {
  if (dropdownIndex !== index) return null;

  return (
    <div className="absolute bg-white border shadow-lg rounded mt-2 right-0 w-48">
      <ul className="text-gray-700">
        <li
          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => toggleDropdown(index)}
        >
          Insert Polygon Before
        </li>
        <li
          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => toggleDropdown(index)}
        >
          Insert Polygon After
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
