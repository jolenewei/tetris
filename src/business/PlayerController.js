import { hasCollision, isWithinBoard } from "../business/Board";
import { rotate } from "../business/Tetrominoes";
import { Action } from "../business/Input";
import { buildPlayer } from "../hooks/usePlayer";

export const movePlayer = ({ delta, position, shape, board }) => {
  const desiredNextPosition = {
    row: position.row + delta.row,
    column: position.column + delta.column,
  };

  const collided = hasCollision({
    board,
    position: desiredNextPosition,
    shape,
  });

  const isOnBoard = isWithinBoard({
    board,
    position: desiredNextPosition,
    shape,
  });

  const preventMove = !isOnBoard || (isOnBoard && collided);
  const nextPosition = preventMove ? position : desiredNextPosition;

  const isMovingDown = delta.row > 0;
  const isHit = isMovingDown && (collided || !isOnBoard);

  return { collided: isHit, nextPosition };
};

const attemptRotation = ({ board, player, setPlayer }) => {
  const shape = rotate({
    piece: player.tetromino.shape,
    direction: 1,
  });

  const position = player.position;
  const isValidRotation =
    isWithinBoard({ board, position, shape }) &&
    !hasCollision({ board, position, shape });

  if (isValidRotation) {
    setPlayer({
      ...player,
      tetromino: {
        ...player.tetromino,
        shape,
      },
    });
  }
};

const attemptMovement = ({ board, action, player, setPlayer, setGameOver }) => {
  const delta = { row: 0, column: 0 };
  let isFastDropping = false;

  if (action === Action.FastDrop) {
    isFastDropping = true;
  } else if (action === Action.SlowDrop) {
    delta.row += 1;
  } else if (action === Action.Left) {
    delta.column -= 1;
  } else if (action === Action.Right) {
    delta.column += 1;
  }

  const { collided, nextPosition } = movePlayer({
    delta,
    position: player.position,
    shape: player.tetromino.shape,
    board,
  });

  const isGameOver = collided && player.position.row === 0;
  if (isGameOver) {
    setGameOver(true);
  }

  setPlayer({
    ...player,
    collided,
    isFastDropping,
    position: nextPosition,
  });
};

export const playerController = ({
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
}) => {
  if (!action) return;


  if (action === Action.Hold) {
    if (usedHold || !player?.tetromino) return;

    setUsedHold(true);
    const current = player.tetromino;

    if (!hold) {
      setHold(current);
      resetPlayer(true);
    } else {
      setHold(current);

      setPlayer(prev => {
        const updated = {
          ...prev,
          tetrominoes: [player.tetromino, ...prev.tetrominoes], // put current back into queue
        };

        const rebuilt = buildPlayer(updated, true);
        return rebuilt;
      });
    }
    return;
  }

  if (action === Action.Rotate) {
    attemptRotation({ board, player, setPlayer });
  } else {
    attemptMovement({ board, player, setPlayer, action, setGameOver });
  }
};
