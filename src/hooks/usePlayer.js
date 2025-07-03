import { useState, useCallback } from "react";
import { randomTetromino } from "../business/Tetrominoes";

export const buildPlayer = (previous = null, skipNext = false) => {
  let tetrominoes;

  if (previous) {
    tetrominoes = [...previous.tetrominoes];
    if (!skipNext) tetrominoes.unshift(randomTetromino());
  } else {
    tetrominoes = Array(5).fill(0).map(randomTetromino);
  }

  return {
    collided: false,
    isFastDropping: false,
    position: { row: 0, column: 4 },
    tetrominoes,
    tetromino: tetrominoes.pop(),
  };
};

export const usePlayer = () => {
  const [player, setPlayer] = useState(() => buildPlayer());

  const resetPlayer = useCallback((skipNext = false) => {
    setPlayer(prev => buildPlayer(prev, skipNext));
  }, []);

  const [hold, setHold] = useState(null);
  const [usedHold, setUsedHold] = useState(false);

  return [player, setPlayer, resetPlayer, hold, setHold, usedHold, setUsedHold];
};
