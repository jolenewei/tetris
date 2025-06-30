import { useState, useEffect } from "react";
import { buildBoard, nextBoard } from "../business/Board";

export const useBoard = ({
  rows,
  columns,
  player,
  resetPlayer,
  addLinesCleared,
  setGameOver,
}) => {
  const [board, setBoard] = useState(buildBoard({ rows, columns }));

  useEffect(() => {
    if (!player) return;

    setBoard((previousBoard) => {
      const safeBoard = previousBoard || buildBoard({ rows, columns });

      return nextBoard({
        board: safeBoard,
        player,
        resetPlayer,
        addLinesCleared,
        setGameOver,
      }) || safeBoard;
    });
  }, [player, resetPlayer, addLinesCleared, setGameOver, rows, columns]);

  return [board];
};

