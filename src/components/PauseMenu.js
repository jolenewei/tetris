import React from "react";
import "./PauseMenu.css";

const PauseMenu = ({ onResume, onRestart, onMenu}) => {
  return (
    <div className="pause-overlay">
      <div className="pause-menu">
        <h2>Game Paused</h2>
        <button onClick={onResume}>Resume</button>
        <button onClick={onRestart}>Restart</button>
        <button onClick={onMenu}>Main Menu</button>
      </div>
    </div>
  );
};

export default PauseMenu;
