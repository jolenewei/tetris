import "./Tetris.css";

import Board from "../components/Board";
import GameController from "../components/GameController";
import GameStats from "../components/GameStats";
import Previews from "../components/Previews";
import PauseMenu from "../components/PauseMenu";

import { useBoard } from "../hooks/useBoard";
import { useGameStats } from "../hooks/useGameStats";
import { usePlayer } from "../hooks/usePlayer";

const Tetris = ({ rows, columns, setGameOver }) => {
  const [paused, setPaused] = useState(false);

  const [gameStats, addLinesCleared] = useGameStats();
  const [player, setPlayer, resetPlayer] = usePlayer(true);
  const [board, setBoard] = useBoard({
    rows,
    columns,
    player: paused ? null : player, // disable updates if paused
    resetPlayer,
    addLinesCleared
  });

  return (
    <div className="Tetris">
        {/* Pause Button */}
      {!paused && (
        <button className="pause-button" onClick={() => setPaused(true)}>
          Pause
        </button>
      )}

      {/* Pause Menu */}
      {paused && (
        <PauseMenu
          onResume={() => setPaused(false)}
          onRestart={() => setGameOver(true)} // lets Game.js show the restart button
        />
      )}

      <Board board={board} />
      <GameStats gameStats={gameStats} />
      <Previews tetrominoes={player.tetrominoes} />
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
