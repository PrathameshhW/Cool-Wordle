import React, { useEffect, useState } from "react";
import "./app.css";
import Header from "./components/header";
import Grid from "./components/grid";
import Keyboard from "./components/keyboard";
import ALL_ENGLISH_WORDS from "./components/english.json";
function App() {
  const width = 5;
  const height = 6;

  const validEnglishWords = Object.keys(ALL_ENGLISH_WORDS)
    .filter((word) => word.length === width)
    .map((word) => word.toUpperCase());
  const [mysteryWord, setMysteryWord] = useState(
    validEnglishWords[Math.floor(Math.random() * validEnglishWords.length)]
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [guessedWords, setGuessedWords] = useState([]);
  const [pressedKey, setPressKey] = useState("");
  const [flashMessage, setFlashMessage] = useState(null);

  const onKeyPress = (key) => {
    setPressKey(key);
  };

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
        if (validEnglishWords.includes(currentWord)) {
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
        {userLost && <div className="loser">You Lost :( </div>}
        {flashMessage != null && <div className="flash">{flashMessage}</div>}
        <Grid width={width} height={height} content={getContent()} />
        <Keyboard onKeyPress={(key) => onKeyPress(key)} />
      </div>
    </>
  );
}

export default App;
