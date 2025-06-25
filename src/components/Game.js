import Tetris from './Tetris';
import { useGameOver } from "../hooks/useGameOver";
import React, { useState } from "react";

const Game = ({ rows, columns }) => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();

  return (
    <div className="Game">
      {gameOver && (
        <div className="game-over">
          <p>Game Over!</p>
          <button onClick={resetGameOver} className="start-button">
            Restart Game
          </button>
        </div>
      )}

      {!gameOver && (
        <Tetris rows={rows} columns={columns} setGameOver={setGameOver} />
      )}
    </div>
  );
};

export default Game;
