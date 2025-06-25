import React from "react";
import "./PauseMenu.css";

const PauseMenu = ({ onResume, onRestart }) => {
  return (
    <div className="pause-menu">
      <h2>Game Paused</h2>
      <button onClick={onResume}>Resume</button>
      <button onClick={onRestart}>Restart</button>
    </div>
  );
};

export default PauseMenu;
