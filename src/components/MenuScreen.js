import React from "react";
import "./MenuScreen.css";

const MenuScreen = ({ onStartGame, highScore, gameOver }) => {
  return (
    <div className="menu-screen">
      <h1 className="menu-title">{gameOver ? 'GAME OVER' : 'TETRIS'} </h1>
      <div className="menu-info">
        <p className="high-score">High Score: {isNaN(highScore) ? 0 : highScore}</p>
        <button onClick={onStartGame} className="start-button">Start Game</button>
      </div>
    </div>
  );
};

console.log("MenuScreen component loaded");
export default MenuScreen;
