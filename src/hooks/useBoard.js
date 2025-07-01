import { useState, useEffect } from "react";
import { buildBoard, nextBoard } from "../business/Board";

export const useBoard = ({
  rows,
  columns,
  player,
  resetPlayer,
  addLinesCleared,
  setGameOver,
  setUsedHold,
}) => {
  const [board, setBoard] = useState(() =>
    buildBoard({ rows, columns })
  );

  useEffect(() => {
    if (!player) return;

    setBoard((previousBoard) => {
      const safeBoard = previousBoard || buildBoard({ rows, columns });

      const newBoard = nextBoard({
        board: safeBoard,
        player,
        resetPlayer,
        addLinesCleared,
        setGameOver,
      });

      if (newBoard !== safeBoard && setUsedHold) {
        setUsedHold(false); // ✅ only if setUsedHold exists
      }

      return newBoard || safeBoard; // ✅ ensure board is always returned
    });
  }, [player, resetPlayer, addLinesCleared, setGameOver, rows, columns, setUsedHold]);

  return [board];
};
