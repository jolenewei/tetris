import React, { useEffect, useState } from "react";
import "./MenuScreen.css";

const tetrominoImages = [
  "/assets/blocks/red-tetromino.png",
  "/assets/blocks/green-tetromino.png",
  "/assets/blocks/blue-tetromino.png",
];

const generatePositionAwayFromCenter = () => {
  const left = Math.random() < 0.5
    ? Math.random() * 35  // left third: 0–35%
    : 65 + Math.random() * 30; // right third: 65–95%
  return `${left}%`;
};

const MenuScreen = ({ onStartGame, highScore, gameOver }) => {
  const [ fallingBlocks, setFallingBlocks ] = useState([]);
  useEffect(() => {
    const generateFallingBlocks = (count, isFirstLoad = false) =>
      Array.from({ length: count }, () => ({
        id: Math.random().toString(36).substring(2),
        left: generatePositionAwayFromCenter(),
        delay: isFirstLoad ? "0s" : Math.random() * 10 + "s",
        duration: 10 + Math.random() * 6 + "s",
        img: tetrominoImages[Math.floor(Math.random() * tetrominoImages.length)],
      }));

      setFallingBlocks(generateFallingBlocks(4, true));
    }, []);

  return (
    <div className="menu-screen">
      {/* animated falling blocks */}
      <div className="falling-blocks"></div>
      {fallingBlocks.map((block) => (
        <img
          key={block.id}
          src={block.img}
          className="falling-block"
          style={{
            left: block.left,
            animationDelay: block.delay,
            animationDuration: block.duration,
          }}
        />
      ))}
   
      <h1 className="menu-title">{gameOver ? "GAME OVER" : "TETRIS"}</h1>
      <div className="menu-info">
        <p className="high-score">High Score: {isNaN(highScore) ? 0 : highScore}</p>
        <button onClick={onStartGame} className="start-button">Start Game</button>
      </div>
    </div>
  );
};

export default MenuScreen;
