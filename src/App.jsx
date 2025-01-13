import React, { useState } from "react";
import MapComponent from "./components/Map/MapComponent";
import MissionModal from "./components/Modal/MissionModal";
import DrawButton from "./components/Button/DrawButton";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDrawClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleGenerateData = () => {
    alert("Data generated successfully!");
    setIsModalOpen(false);
  };

  return (
    <div className="h-screen w-full">
      <MapComponent />
      <DrawButton onClick={handleDrawClick} />
      {isModalOpen && (
        <MissionModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onGenerateData={handleGenerateData}
        />
      )}
    </div>
  );
};

export default App;
