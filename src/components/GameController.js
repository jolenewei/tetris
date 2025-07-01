import { useEffect } from "react";
import { Action, actionForKey, actionIsDrop } from "../business/Input";
import { playerController } from "../business/PlayerController";
import { useDropTime } from "../hooks/useDropTime";
import { useInterval } from "../hooks/useInterval";

const GameController = ({
  board,
  gameStats,
  player,
  setGameOver,
  setPlayer,
  paused,
  hold,
  setHold,
  usedHold,
  setUsedHold,
  resetPlayer,
}) => {
  const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({ gameStats });

  useInterval(() => {
    if (dropTime && !paused) {
      handleInput({ action: Action.SlowDrop });
    }
  }, dropTime);

  const handleInput = ({ action }) => {
    if (!board || !board.rows) return;
    
    playerController({
      action,
      board,
      player,
      setPlayer,
      setGameOver,
      hold,
      setHold,
      usedHold,
      setUsedHold,
      resetPlayer,
    });
  };

  const handleKeyDown = (event) => {
    if (paused) return;

    const action = actionForKey(event.code);
    if (action === Action.Pause) {
      pauseDropTime();
    } else if (action === Action.Quit) {
      setGameOver(true);
    } else {
      if (actionIsDrop(action)) pauseDropTime();
      handleInput({ action });
    }
  };

  const handleKeyUp = (event) => {
    if (paused) return;

    const action = actionForKey(event.code);
    if (actionIsDrop(action)) resumeDropTime();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [player, paused]);

  return null;
};

export default GameController;
