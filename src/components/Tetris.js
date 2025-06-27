import "./Tetris.css";

import Board from "../components/Board";
import GameController from "../components/GameController";
import GameStats from "../components/GameStats";
import Previews from "../components/Previews";
import PauseMenu from "../components/PauseMenu";
import MenuScreen from "../components/MenuScreen";

import { useState, useEffect } from "react";
import { useBoard } from "../hooks/useBoard";
import { useGameStats } from "../hooks/useGameStats";
import { usePlayer } from "../hooks/usePlayer";


const Tetris = ({ rows, columns, setGameOver, setHighScore, isMenuVisible }) => {
  const [paused, setPaused] = useState(false);
  const [gameKey, setGameKey] = useState(0); // used to force a game restart
  const [score, setScore] = useState(0); // track score
  const [showMenu, setShowMenu] = useState(true);
  const [player, setPlayer, resetPlayer] = usePlayer();
  // track score updates from GameStats
  const [gameStats, addLinesCleared] = useGameStats();
  
  useEffect(() => {
    setScore(gameStats.score);
  }, [gameStats.score]);

  // on game over, update high score
  useEffect(() => {
    return () => {
      setHighScore(prev => Math.max(prev, score));
    };
  }, [score, setHighScore]);

  const resetGame = () => {
    setGameKey(prev => prev + 1); // force restart
    setPaused(false); // unpause
    setShowMenu(false); // hide main menu
  };

  return (
    <div className="Tetris">
      {!paused && !showMenu && (
        <button className="pause-button" onClick={() => setPaused(true)}>
          | |
        </button>
      )}

      {paused && !showMenu && (
        <PauseMenu
          onResume={() => setPaused(false)}
          onRestart={resetGame}
          onMenu={() => {
            setPaused(false);
            setShowMenu(true);
          }}
        />
      )}

      {showMenu && (
        <MenuScreen
          highScore={score}
          onStartGame={resetGame}
        />
      )}

      {!showMenu && (
        <GameInstance
          key={gameKey}
          rows={rows}
          columns={columns}
          paused={paused}
          setPaused={setPaused}
          setGameOver={setGameOver}
        />
      )}
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
