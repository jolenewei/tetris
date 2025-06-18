import React, { useState, useEffect } from "react";
import "./Tetris.css";

import Board from "/src/components/Board";
import GameController from "/src/components/GameController";
import GameStats from "/src/components/GameStats";
import Previews from "/src/components/Previews";

import { useBoard } from "/src/hooks/useBoard";
import { useGameStats } from "/src/hooks/useGameStats";
import { usePlayer } from "/src/hooks/usePlayer";

const Tetris = ({ rows, columns, setGameOver }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameStats, addLinesCleared] = useGameStats();
  const [player, setPlayer, resetPlayer, holdTetromino, heldTetromino] =
    usePlayer(gameStarted);
  const [board, setBoard] = useBoard({
    rows,
    columns,
    player: gameStarted ? player : null,
    resetPlayer,
    addLinesCleared,
  });

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toLowerCase() === "c") {
        holdTetromino();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [holdTetromino]);

  const startGame = () => {
    setGameStarted(true);
    resetPlayer();
  };

  return (
    <div className="Tetris">
      {!gameStarted && (
        <button onClick={startGame} className="start-button">
          Start Game
        </button>
      )}
      <div className="game-container">
        <div className="hold-container">
          <h3>HOLD</h3>
          {heldTetromino ? (
            <Board
              board={
                <Board
                  board={Array(4).fill(Array(4).fill(0))}
                  tetromino={heldTetromino}
                />
              }
              tetromino={heldTetromino}
            />
          ) : (
            <div className="empty-hold">Empty</div>
          )}
        </div>
        <Board board={board} />
        <div className="side-panel">
          <GameStats gameStats={gameStats} />
          <Previews
            tetrominoes={gameStarted && player ? player.tetrominoes : []}
          />
        </div>
      </div>
      {gameStarted && (
        <GameController
          board={board}
          gameStats={gameStats}
          player={player}
          setGameOver={setGameOver}
          setPlayer={setPlayer}
          holdTetromino={holdTetromino}
        />
      )}
    </div>
  );
};

export default Tetris;
