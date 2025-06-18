import { useState, useEffect } from "react";
import { buildBoard, nextBoard } from "/src/business/Board";

export const useBoard = ({
  rows,
  columns,
  player,
  resetPlayer,
  addLinesCleared,
}) => {
  const [board, setBoard] = useState(buildBoard({ rows, columns }));

  useEffect(() => {
    if (!player) return;

    setBoard((previousBoard) => {
      const safeBoard = previousBoard || buildBoard({ rows, columns });

      const newBoard = nextBoard({
        board: safeBoard,
        player,
        resetPlayer,
        addLinesCleared,
      });
      return newBoard || safeBoard;
    });
  }, [player, resetPlayer, addLinesCleared]);

  return [board];
};
