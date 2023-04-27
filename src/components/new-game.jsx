import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import getLanguageConfigs from "./language-configs";
import "./new-game.scss";

const NewGame = () => {
  const navigate = useNavigate();
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(6);
  const [language, setLanguage] = useState("English");
  const [startingGame, setStartingGame] = useState(false);

  const widthChoices = [2, 3, 4, 5, 6, 7, 8];
  const heightChoices = [2, 3, 4, 5, 6, 7, 8];
  const languageChoices = getLanguageConfigs();
  useEffect(() => {
    if (startingGame) {
      navigate(`/play?width=${width}&height=${height}&language=${language}`);
    }
  }, [startingGame]);

  const onWidthChange = (e) => {
    setWidth(e.target.value);
  };
  const onHeightChange = (e) => {
    setHeight(e.target.value);
  };
  const onLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <>
      <div className="new-game-container">
        <h2>Configure your Wordplay game</h2>
        <label htmlFor="">Number of Letters: </label>
        <select
          name="width"
          id="width"
          defaultValue={width}
          onChange={onWidthChange}
        >
          {widthChoices.map((widthChoice) => {
            return (
              <option key={widthChoice} value={widthChoice}>
                {widthChoice}
              </option>
            );
          })}
        </select>
        <label htmlFor="">Number of Chances: </label>
        <select
          name="width"
          id="width"
          defaultValue={height}
          onChange={onHeightChange}
        >
          {heightChoices.map((heightChoice) => {
            return (
              <option key={heightChoice} value={heightChoice}>
                {heightChoice}
              </option>
            );
          })}
        </select>
        <label htmlFor="">Choose a language</label>
        <select
          name="width"
          id="width"
          defaultValue={language}
          onChange={onLanguageChange}
        >
          {Object.keys(languageChoices).map((languageChoice) => {
            return (
              <option key={languageChoice} value={languageChoice}>
                {languageChoice}
              </option>
            );
          })}
        </select>
        <button onClick={() => setStartingGame(true)}>Start Game</button>
      </div>
    </>
  );
};

export default NewGame;
