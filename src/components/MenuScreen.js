import React from "react";
import "./MenuScreen.css";

const MenuScreen = ({ onStartGame, highScore }) => {
  return (
    <div className="menu-screen">
      <h1 className="menu-title">TETRIS</h1>
      <div className="menu-info">
        <p className="high-score">High Score: {highScore}</p>
        <button onClick={onStartGame} className="start-button">Start Game</button>
      </div>
    </div>
  );
};

export default MenuScreen;
