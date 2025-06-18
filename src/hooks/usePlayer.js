import { useState, useEffect, useCallback } from "react";
import { randomTetromino } from "/src/business/Tetrominoes";

const buildPlayer = (previous) => {
  let tetrominoes;

  if (previous) {
    tetrominoes = [...previous.tetrominoes];
    tetrominoes.unshift(randomTetromino());
  } else {
    tetrominoes = Array(5)
      .fill(0)
      .map(() => randomTetromino());
  }

  return {
    collided: false,
    isFastDropping: false,
    position: { row: 0, column: 4 },
    tetrominoes,
    tetromino: tetrominoes.pop() || randomTetromino(),
  };
};

export const usePlayer = (gameStarted) => {
  const [player, setPlayer] = useState(null);
  const [heldTetromino, setHeldTetromino] = useState(null);
  const [hasSwapped, setHasSwapped] = useState(false);

  const resetPlayer = useCallback(() => {
    if (gameStarted) {
      setPlayer(buildPlayer());
      setHasSwapped(false); // Allow swapping again
    }
  }, [gameStarted]);

  const holdTetromino = () => {
    if (hasSwapped || !player) return; // Prevent multiple swaps until the next block lands

    console.log("Holding tetromino:", player.tetromino);

    setHasSwapped(true); // Prevent additional swaps in the same round

    if (!heldTetromino) {
      setHeldTetromino(player.tetromino);
      setPlayer(buildPlayer(player)); // Get a new Tetromino
    } else {
      setPlayer((prev) => ({
        ...prev,
        tetromino: heldTetromino,
        position: { row: 0, column: 4 }, // Reset position
        collided: false,
      }));
      setHeldTetromino(player.tetromino);
    }
  };

  useEffect(() => {
    if (gameStarted) {
      setPlayer(buildPlayer());
      setHasSwapped(false); // Reset swap permission
    } else {
      setPlayer(null);
      setHeldTetromino(null);
    }
  }, [gameStarted]);

  return [player, setPlayer, resetPlayer, holdTetromino, heldTetromino];
};
