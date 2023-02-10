import React from "react";
import "./grid.scss";
const Grid = (props) => {
  const tiles = [...Array(props.height).keys()].map((i, _) => (
    <div className="row" key={`${i}`}>
      {[...Array(props.width).keys()].map((j, _) => {
        return <div className="tile" key={`${i}-${j}`}>{`(${i},${j})`}</div>;
      })}
    </div>
  ));

  return (
    <>
      <div className="grid-container">
        <div className="tiles-container">{tiles}</div>
      </div>
    </>
  );
};

export default Grid;
