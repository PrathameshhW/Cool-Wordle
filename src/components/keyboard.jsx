import "./keyboard.scss";

import React from "react";

const Keyboard = (props) => {
  const characterRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
  ];
  return (
    <>
      <div className="keyboard-container">
        {characterRows.map((row, i) => {
          return (
            <div className="row-container" key={i}>
              (
              {row.map((character, j) => {
                return (
                  <div
                    className="keyword-button"
                    key={j}
                    onClick={() => props.onKeyPress(character)}
                  >
                    {character}
                  </div>
                );
              })}
              )
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Keyboard;
