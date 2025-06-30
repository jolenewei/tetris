import React from "react";
import Tetris from "./Tetris";

const Game = ({ rows, columns }) => {
  return (
    <div className="Game">
      <Tetris rows={rows} columns={columns} />
    </div>
  );
};

export default Game;
