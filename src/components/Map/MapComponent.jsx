import React, { useState, useEffect } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Draw from 'ol/interaction/Draw';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { useGeographic } from 'ol/proj';
import MissionModal from '../Modal/MissionModal';

useGeographic();

const MapComponent = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      const vectorSource = new VectorSource();
      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });

      // Initialize the map
      const map = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          vectorLayer,
        ],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });

      const draw = new Draw({
        source: vectorSource,
        type: 'LineString',
      });

      // Handle draw end event
      draw.on('drawend', (event) => {
        const drawnCoordinates = event.feature.getGeometry().getCoordinates();
        setCoordinates(drawnCoordinates); // Set coordinates state
        setIsModalOpen(true); // Open the modal
      });

      // add draw-interaction ---> to the map
      map.addInteraction(draw);

      return () => {
        map.setTarget(null); // cleanup for memoryleaks
      };
    } catch (error) {
      console.error('Error initializing the map:', error);
    }
  }, []);

  // close modal : reset coordinates
  const closeModal = () => {
    setIsModalOpen(false);
    setCoordinates([]); // Reset coordinates
  };
  const handleGenerateData = () => {
    console.log('Generated Data:', coordinates);
    // Implement your data generation logic here
  };

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <MissionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        coordinates={coordinates}
        onGenerateData={handleGenerateData}
      />
    </div>
  );
};

export default MapComponent;
