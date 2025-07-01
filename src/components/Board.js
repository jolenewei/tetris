import "./Board.css";
import BoardCell from "./BoardCell";

const Board = ({ board }) => {
  if (!board || !board.rows) {
    return <div className="Board">Loading...</div>;
  }

  const boardStyles = {
    gridTemplateRows: `repeat(${board.size.rows}, 1fr)`,
    gridTemplateColumns: `repeat(${board.size.columns}, 1fr)`,
  };

  return (
    <div className="Board" style={boardStyles}>
      {board.rows.map((row, y) =>
        row.map((cell, x) => (
          <BoardCell key={y * board.size.columns + x} cell={cell} />
        ))
      )}
    </div>
  );
};

export default Board;