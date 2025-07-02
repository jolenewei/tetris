import React from "react";
import Preview from '../components/Preview';

const Previews = ({ tetrominoes }) => {
  if (!Array.isArray(tetrominoes) || tetrominoes.length === 0) {
    return null;
  }

  const previewTetrominoes = tetrominoes
    .slice(1 - tetrominoes.length)
    .filter(t => t && t.shape)
    .reverse();

  return (
    <>
      {previewTetrominoes.map((tetromino, index) => (
        <Preview tetromino={tetromino} index={index} key={index} />
      ))}
    </>
  );
};

export default React.memo(Previews);