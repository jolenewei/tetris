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

const Tetris = ({ rows, columns }) => {
  const [paused, setPaused] = useState(false);
  const [menuVisible, setMenuVisible] = useState(true);
  const [gameKey, setGameKey] = useState(0); // used to restart game
  const [highScore, setHighScore] = useState(0);

  const resetGame = () => {
    setGameKey(prev => prev + 1);
    setPaused(false);
    setMenuVisible(false);
  };

  return (
    <div className="Tetris">
      {menuVisible && (
        <MenuScreen
          highScore={highScore}
          onStartGame={resetGame}
          gameOver={gameKey > 0} // only show game over after game was played at least once
        />
      )}

      {!menuVisible && !paused && (
        <button className="pause-button" onClick={() => setPaused(true)}>
          <img src="/assets/pause-button.png" alt="Pause" className="pause-icon"/>
        </button>
      )}

      {!menuVisible && paused && (
        <PauseMenu
          onResume={() => setPaused(false)}
          onRestart={resetGame}
          onMenu={() => {
            setPaused(false);
            setMenuVisible(true);
          }}
        />
      )}

      {!menuVisible && (
        <GameInstance
          key={gameKey}
          rows={rows}
          columns={columns}
          paused={paused}
          setPaused={setPaused}
          onGameOver={() => setMenuVisible(true)}
          updateHighScore={(score) => setHighScore(prev => Math.max(prev, score))}
        />
      )}
    </div>
  );
};

const GameInstance = ({ rows, columns, paused, setPaused, onGameOver, updateHighScore }) => {
  const [gameStats, addLinesCleared] = useGameStats();
  const [player, setPlayer, resetPlayer] = usePlayer(true);
  const [board] = useBoard({
    rows,
    columns,
    player: paused ? null : player,
    resetPlayer,
    addLinesCleared,
    setGameOver: onGameOver,
  });

  useEffect(() => {
    return () => {
      updateHighScore(gameStats.score);
    };
  }, [gameStats.score, updateHighScore]);

  return (
    <div className="game-container">
      <Board board={board} />
      <div className="side-panel">
        <GameStats gameStats={gameStats} />
        <Previews tetrominoes={player?.tetrominoes || []} />
      </div>
      <GameController
        board={board}
        gameStats={gameStats}
        player={player}
        setGameOver={onGameOver}
        setPlayer={setPlayer}
        paused={paused}
      />
    </div>
  );
};

export default Tetris;
