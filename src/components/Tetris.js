import "./Tetris.css";

import Board from "../components/Board";
import GameController from "../components/GameController";
import GameStats from "../components/GameStats";
import Previews from "../components/Previews";
import PauseMenu from "../components/PauseMenu";

import { useState, useEffect } from "react";
import { useBoard } from "../hooks/useBoard";
import { useGameStats } from "../hooks/useGameStats";
import { usePlayer } from "../hooks/usePlayer";

const Tetris = ({ rows, columns, setGameOver }) => {
  const [paused, setPaused] = useState(false);
  const [gameKey, setGameKey] = useState(0); // used to force a game restart

  const resetGame = () => {
    setGameKey(prev => prev + 1); // this will remount the entire game state
    setPaused(false); // close the pause menu
  };

  return (
    <div className="Tetris">
      {!paused && (
        <button className="pause-button" onClick={() => setPaused(true)}>
          | |
        </button>
      )}

      {paused && (
        <PauseMenu
          onResume={() => setPaused(false)}
          onRestart={resetGame} // ✅ now triggers a full reset, not game over
        />
      )}

      {/* Key forces reset when needed */}
      <GameInstance
        key={gameKey}
        rows={rows}
        columns={columns}
        paused={paused}
        setPaused={setPaused}
        setGameOver={setGameOver}
      />
    </div>
  );
};

const GameInstance = ({ rows, columns, paused, setPaused, setGameOver }) => {
  const [gameStats, addLinesCleared] = useGameStats();
  const [player, setPlayer, resetPlayer] =
    usePlayer(true);
  const [board, setBoard] = useBoard({
    rows,
    columns,
    player: paused ? null : player,
    resetPlayer,
    addLinesCleared
  });

  return (
    <div className="game-container">

      {/* MAIN BOARD */}
      <Board board={board} />

      {/* SIDE PANEL */}
      <div className="side-panel">
        <GameStats gameStats={gameStats} />
        <Previews tetrominoes={player?.tetrominoes || []} />
      </div>

      {/* GAME LOGIC */}
      <GameController
        board={board}
        gameStats={gameStats}
        player={player}
        setGameOver={setGameOver}
        setPlayer={setPlayer}
        paused={paused}
      />
    </div>
  );
};

export default Tetris;
