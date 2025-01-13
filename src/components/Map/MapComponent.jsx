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
import PolygonModal from '../Modal/PolygonModal';

useGeographic();

const MapComponent = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [isLineStringModalOpen, setIsLineStringModalOpen] = useState(false);
  const [isPolygonModalOpen, setIsPolygonModalOpen] = useState(false);
  const [drawInteraction, setDrawInteraction] = useState(null);
  const [currentShape, setCurrentShape] = useState('');
  const [map, setMap] = useState(null);
  const vectorSource = React.useRef(new VectorSource()).current;

  useEffect(() => {
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    // Initialize the map
    const mapInstance = new Map({
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

    setMap(mapInstance);

    // Draw interaction for LineString
    const drawLineString = new Draw({
      source: vectorSource, // Use shared vector source
      type: 'LineString',
    });

    // Draw interaction for Polygon
    const drawPolygon = new Draw({
      source: vectorSource, // Use shared vector source
      type: 'Polygon',
    });

    // Event listeners for LineString
    drawLineString.on('drawend', (event) => {
      const drawnCoordinates = event.feature.getGeometry().getCoordinates();
      setCoordinates(drawnCoordinates);
      setCurrentShape('LineString');
      setIsLineStringModalOpen(true);
    });

    // Event listeners for Polygon
    drawPolygon.on('drawend', (event) => {
      const geometry = event.feature.getGeometry();
      const drawnCoordinates = geometry.getCoordinates();

      if (drawnCoordinates.length > 0) {
        const outerRing = drawnCoordinates[0];
        setCoordinates(outerRing);
      } else {
        setCoordinates([]);
      }

      setCurrentShape('Polygon');
      setIsPolygonModalOpen(true);
    });

    // Set initial interaction to draw LineString
    mapInstance.addInteraction(drawLineString);
    setDrawInteraction(drawLineString);

    return () => {
      if (drawInteraction && mapInstance) {
        mapInstance.removeInteraction(drawInteraction);
      }
      mapInstance.setTarget(null);
    };
  }, [vectorSource]);

  // Handle closing the MissionModal and switching to Polygon mode
  const closeLineStringModal = () => {
    setIsLineStringModalOpen(false);
    setCoordinates([]);

    if (drawInteraction && map) {
      map.removeInteraction(drawInteraction); // Remove LineString
    }

    // Switch to Polygon interaction
    const polygonInteraction = new Draw({
      source: vectorSource, // Use shared vector source
      type: 'Polygon',
    });

    polygonInteraction.on('drawend', (event) => {
      const geometry = event.feature.getGeometry();
      const drawnCoordinates = geometry.getCoordinates();
      console.log('Polygon drawn coordinates:', drawnCoordinates);

      if (drawnCoordinates.length > 0) {
        const outerRing = drawnCoordinates[0];
        setCoordinates(outerRing);
      } else {
        setCoordinates([]);
      }

      setCurrentShape('Polygon');
      setIsPolygonModalOpen(true);
    });

    map.addInteraction(polygonInteraction);
    setDrawInteraction(polygonInteraction);
  };

  // Handle closing the PolygonModal
  const closePolygonModal = () => {
    setIsPolygonModalOpen(false);
    setCoordinates([]);
  };

  const handleGenerateData = () => {
    console.log('Generated Data:', coordinates);
  };

  return (
    <div className="h-screen w-screen">
      <div id="map" className="h-full w-full"></div>

      {/* LineString Modal */}
      <MissionModal
        isOpen={isLineStringModalOpen}
        onClose={closeLineStringModal}
        coordinates={coordinates}
        onGenerateData={handleGenerateData}
      />

      {/* Polygon Modal */}
      <PolygonModal
        isOpen={isPolygonModalOpen}
        onClose={closePolygonModal}
        coordinates={coordinates}
        onGenerateData={handleGenerateData}
      />
    </div>
  );
};

export default MapComponent;
