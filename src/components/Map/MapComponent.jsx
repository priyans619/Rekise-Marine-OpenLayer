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
  const [drawInteraction, setDrawInteraction] = useState(null);

  useEffect(() => {
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

    // Add draw interaction
    const draw = new Draw({
      source: vectorSource,
      type: 'LineString',
    });
    setDrawInteraction(draw);
    map.addInteraction(draw);

    return () => {
      map.setTarget(null);
    };
  }, []);

  useEffect(() => {
    if (!drawInteraction) return;

    // Listener for when drawing ends (Enter key)
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        drawInteraction.finishDrawing();
      }
    };

    // Listen for the `drawend` event to open the modal and get coordinates
    drawInteraction.on('drawend', (event) => {
      const drawnCoordinates = event.feature.getGeometry().getCoordinates();
      setCoordinates(drawnCoordinates);
      setIsModalOpen(true);
    });

    // Attach keydown listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [drawInteraction]);

  // close modal : reset coordinates
  const closeModal = () => {
    setIsModalOpen(false);
    setCoordinates([]);
  };

  const handleGenerateData = () => {
    console.log('Generated Data:', coordinates);
  };

  return (
    <div className="h-screen w-screen">
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

export default MapComponent;
