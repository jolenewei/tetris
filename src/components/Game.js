import React, { useState } from "react";
import Tetris from "./Tetris";
import MenuScreen from "../components/MenuScreen";
import { useGameOver } from "../hooks/useGameOver";

const Game = ({ rows, columns }) => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();
  const [menuVisible, setMenuVisible] = useState(true);
  const [gameKey, setGameKey] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const handleStartGame = () => {
    setMenuVisible(false);
    resetGameOver();
    setGameKey(prev => prev + 1);
  };

  const handleEndGame = () => {
    setGameOver(true);
    setMenuVisible(true);
  };

  return (
    <div className="Game">
      {menuVisible && (
        <MenuScreen
          onStartGame={handleStartGame}
          highScore={highScore}
        />
      )}
      <Tetris
        key={gameKey}
        rows={rows}
        columns={columns}
        setGameOver={handleEndGame}
        setHighScore={setHighScore}
        isMenuVisible={menuVisible}
      />
    </div>
  );
};

export default Game;

