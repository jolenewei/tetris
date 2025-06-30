import React from "react";
import "./GameStats.css";

const GameStats = ({ gameStats }) => {
  const { level, score, linesCompleted, linesPerLevel } = gameStats;
  const linesToLevel = linesPerLevel - linesCompleted;

  return (
    <ul className="GameStats GameStats__right">
      <li>Level</li>
      <li className="value">{level}</li>
      <li>Lines to level</li>
      <li className="value">{linesToLevel}</li>
      <li>Score</li>
      <li className="value">{score}</li>
    </ul>
  );
};

export default React.memo(GameStats);
