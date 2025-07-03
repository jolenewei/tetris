import "./Preview.css";
import React from "react";
import { buildBoard } from "../business/Board";
import { transferToBoard } from "../business/Tetrominoes";
import BoardCell from "./BoardCell";

const HoldPreview = ({ tetromino }) => {
  const board = buildBoard({ rows: 4, columns: 4 });

  if (
    tetromino && 
    typeof tetromino.shape !== "undefined" &&
    typeof tetromino.className !== "undefined"
  ) {
    const shape = tetromino.shape;
    const className = tetromino.className;
    
    const centerPosition = {
        row: Math.floor((4 - shape.length) / 2),
        column: Math.floor((4 - shape[0].length) / 2),
  };

  board.rows = transferToBoard({
    className: tetromino.className,
    isOccupied: false,
    position: centerPosition,
    rows: board.rows,
    shape: tetromino.shape,
  });
}

  return (
    <div className="HoldPreview" style={{ top: 0 }}>
      <div className="Preview-board">
        {board.rows.map((row, y) =>
          row.map((cell, x) => (
            <BoardCell key={y * board.size.columns + x} cell={cell} />
          ))
        )}
      </div>
    </div>
  );
};

export default React.memo(HoldPreview);
