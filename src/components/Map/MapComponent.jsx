import React, { useState, useEffect } from 'react';
import Map from 'ol/Map';  // Correct import
import View from 'ol/View';  // Correct import
import { fromLonLat } from 'ol/proj';
import LineString from 'ol/geom/LineString';
import Draw from 'ol/interaction/Draw';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import MissionModal from '../Modal/MissionModal';

const Map = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Create map instance
    const map = new Map({
      target: 'map', // The div id where the map will be rendered
      layers: [
        new VectorLayer({
          source: new VectorSource(),
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]), // Default center [Longitude, Latitude]
        zoom: 2, // Default zoom level
      }),
    });

    // Create Draw interaction for drawing lines
    const draw = new Draw({
      source: new VectorSource(),
      type: 'LineString', // Draw a line string
    });

    draw.on('drawend', (event) => {
      const drawnCoordinates = event.feature.getGeometry().getCoordinates();
      setCoordinates(drawnCoordinates); // Set the coordinates of the drawn line
      setIsModalOpen(true); // Open modal when drawing is completed
    });

    // Add drawing interaction to map
    map.addInteraction(draw);

    return () => {
      map.removeInteraction(draw); // Cleanup the draw interaction on component unmount
    };
  }, []);

  const closeModal = () => setIsModalOpen(false); // Close modal

  const handleGenerateData = () => {
    alert("Data generated successfully!"); // Example action after generating data
    setIsModalOpen(false); // Close modal after data generation
  };

  return (
    <div>
      <div id="map" className="h-full w-full"></div>
      <MissionModal
        isOpen={isModalOpen} 
        onClose={closeModal} 
        coordinates={coordinates}
        onGenerateData={handleGenerateData} 
      />
    </div>
  );
};

export default Map;
