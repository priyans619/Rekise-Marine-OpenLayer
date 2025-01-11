import React, { useState } from "react";
import Map from "./components/Map/Map";
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

  return (
    <div className="h-screen w-full">
      <Map />
      <DrawButton onClick={handleDrawClick} />
      {isModalOpen && <MissionModal onClose={closeModal} />}
    </div>
  );
};

export default App;
