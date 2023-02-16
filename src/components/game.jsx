import React, { useEffect, useState } from "react";
import "./game.scss";
import Header from "../components/header";
import Grid from "../components/grid";
import Keyboard from "../components/keyboard";
import { useSearchParams } from "react-router-dom";
import getLanguageConfigs from "./language-configs";

function Game(props) {
  const [searchParams] = useSearchParams();
  const width = parseInt(searchParams.get("width"));
  const height = parseInt(searchParams.get("height"));
  const language = searchParams.get("language");
  const [mysteryWord, setMysteryWord] = useState(null);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [guessedWords, setGuessedWords] = useState([]);
  const [pressedKey, setPressKey] = useState("");
  const [flashMessage, setFlashMessage] = useState(null);
  const [validWords, setValidWords] = useState([]);
  const [keyboard, setKeyboard] = useState([]);

  const onKeyPress = (key) => {
    setPressKey(key);
  };

  useEffect(() => {
    const config = getLanguageConfigs()[language];
    fetch(config.wordsUrl, {
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const validWords = Object.keys(data)
          .filter((word) => word.length === width)
          .map((word) => word.toUpperCase());
        setValidWords(validWords);
        setMysteryWord(
          validWords[Math.floor(Math.random() * validWords.length)]
        );
        setKeyboard(config.keyboard);
      });
  }, []);

  useEffect(() => {
    if (pressedKey === "") {
      return;
    }

    if (pressedKey !== "ENTER" && pressedKey !== "BACKSPACE") {
      if (currentWord === width) {
        //no-op
      } else {
        setCurrentWord(currentWord + pressedKey);
      }
    }

    if (pressedKey === "BACKSPACE") {
      if (currentWord === "") {
        //no-op
      } else {
        setCurrentWord(currentWord.slice(0, -1));
      }
    }

    if (pressedKey === "ENTER") {
      if (currentWord.length < width) {
        flash("Not enough letters!");
        console.log("Not enough letters!");
      } else {
        if (validWords.includes(currentWord)) {
          setCurrentRow(currentRow + 1);
          setGuessedWords(guessedWords.concat(currentWord));
          setCurrentWord("");
        } else {
          flash("Not in word list");
          console.log("Not in word list");
        }
      }
    }
    setPressKey("");
  }, [pressedKey]);

  const flash = (message) => {
    setFlashMessage(message);
    setTimeout(() => {
      setFlashMessage(null);
    }, 1000); // Showing for 10 sec
  };

  const getContent = () => {
    const objectToReturn = {};
    for (
      let currentWordIndex = 0;
      currentWordIndex < currentWord.length;
      currentWordIndex++
    ) {
      objectToReturn[`${currentRow},${currentWordIndex}`] = {
        color: "black",
        text: currentWord[currentWordIndex],
      };
    }

    guessedWords.forEach((guessedWord, rowNumber) => {
      for (
        let guessedWordIndex = 0;
        guessedWordIndex < guessedWord.length;
        guessedWordIndex++
      ) {
        const gridRowNumber = rowNumber;
        const gridColumnNumber = guessedWordIndex;
        const character = guessedWord[guessedWordIndex];
        let color;
        if (!mysteryWord.includes(character)) {
          color = "grey";
        } else if (mysteryWord[guessedWordIndex] === character) {
          color = "green";
        } else {
          color = "yellow";
        }
        objectToReturn[`${gridRowNumber},${gridColumnNumber}`] = {
          color: color,
          text: character,
        };
      }
    });

    return objectToReturn;
  };

  const userWon = guessedWords.includes(mysteryWord);
  const userLost =
    !guessedWords.includes(mysteryWord) && guessedWords.length == height;

  return (
    <>
      <div className="app-container">
        <Header />
        {userWon && <div className="winner">You Win! </div>}
        {userLost && (
          <div className="loser">
            You Lost :( Correct word was {mysteryWord}
          </div>
        )}
        {flashMessage != null && <div className="flash">{flashMessage}</div>}
        <Grid width={width} height={height} content={getContent()} />
        <Keyboard
          keyboardConfiguration={keyboard}
          onKeyPress={(key) => onKeyPress(key)}
        />
      </div>
    </>
  );
}

export default Game;
