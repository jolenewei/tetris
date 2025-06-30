import { defaultCell } from "../business/Cell";
import { movePlayer } from "../business/PlayerController";
import { transferToBoard } from "../business/Tetrominoes";

// build empty game board
export const buildBoard = ({ rows, columns }) => {
  const builtRows = Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => ({ ...defaultCell }))
  );

  return {
    rows: builtRows,
    size: { rows, columns },
  };
}

// find lowest position the current tetromino can fall to without collision
const findDropPosition = ({ board, position, shape }) => {
  let max = board.size.rows - position.row + 1;
  let row = 0;
  // attempt droppping from current position until collision
  for (let i = 0; i < max; i++) {
    const delta = { row: i, column: 0 };
    const result = movePlayer({ delta, position, shape, board });
    const { collided } = result;

    if (collided) {
      break;
    }

    row = position.row + i;
  }

  return { ...position, row };
};

// build new board state based on current player and board status
export const nextBoard = ({ board, player, resetPlayer, addLinesCleared, setGameOver }) => {
  if (!player || !player.tetromino || !player.position) {
    return {
      rows: board.rows.map((row) => row.map((cell) => ({ ...defaultCell }))),
      size: { ...board.size },
    };
  }

  if (hasCollision({ board, position: player.position, shape: player.tetromino.shape })) {
    setGameOver?.();
    return board; 
  }
  
  const { tetromino, position } = player;

  // create a copy of the board where non-occupied cells are reset
  let rows = board.rows.map((row) =>
    row.map((cell) => (cell.occupied ? cell : { ...defaultCell }))
  );

  // get a drop position for ghost piece
  const dropPosition = findDropPosition({
    board,
    position,
    shape: tetromino.shape,
  });

  // add ghost piece to board (only visible if not fast dropping)
  const className = `${tetromino.className} ${
    player.isFastDropping ? "" : "ghost"
  }`;
  rows = transferToBoard({
    className,
    isOccupied: player.isFastDropping,
    position: dropPosition,
    rows,
    shape: tetromino.shape,
  });

  // place actual piece on board
  if (!player.isFastDropping) {
    rows = transferToBoard({
      className: tetromino.className,
      isOccupied: player.collided, // only make it permanent if it collided
      position,
      rows,
      shape: tetromino.shape,
    });
  }

  // clear full rows and count how many were cleared
  const blankRow = rows[0].map((_) => ({ ...defaultCell }));
  let linesCleared = 0;
  rows = rows.reduce((acc, row) => {
    if (row.every((column) => column.occupied)) {
      linesCleared++;
      acc.unshift([...blankRow]);
    } else {
      acc.push(row);
    }

    return acc;
  }, []);

  // notify parent how many lines were cleared
  if (linesCleared > 0) {
    addLinesCleared(linesCleared);
  }

  // if collided, reset the player
  if (player.collided || player.isFastDropping) {
    resetPlayer();
  }

  // return the next board
  return {
    rows,
    size: { ...board.size },
  };
};

export const hasCollision = ({ board, position, shape }) => {
  for (let y = 0; y < shape.length; y++) {
    const row = y + position.row;

    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const column = x + position.column;

        if (
          board.rows[row] &&
          board.rows[row][column] &&
          board.rows[row][column].occupied
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

// check if the shape is fully inside the board (not outside of bounds)
export const isWithinBoard = ({ board, position, shape }) => {
  for (let y = 0; y < shape.length; y++) {
    const row = y + position.row;

    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const column = x + position.column;
        const isValidPosition = board.rows[row] && board.rows[row][column];

        if (!isValidPosition) return false;
      }
    }
  }
  return true;
};
