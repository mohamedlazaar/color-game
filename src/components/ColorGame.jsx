import React, { useState, useEffect } from "react";
import "../App.css"

const generateRandomColor = () => {
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  return randomColor;
};

const generateColorOptions = (correctColor) => {
  const options = new Set();
  options.add(correctColor);

  while (options.size < 6) {
    options.add(generateRandomColor());
  }

  return Array.from(options).sort(() => Math.random() - 0.5);
};

const ColorGame = () => {
  const [targetColor, setTargetColor] = useState(generateRandomColor());
  const [colorOptions, setColorOptions] = useState([]);
  const [gameStatus, setGameStatus] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    setColorOptions(generateColorOptions(targetColor));
  }, [targetColor]);

  const handleGuess = (selectedColor) => {
    if (selectedColor === targetColor) {
      setGameStatus("🎉 Correct!");
      setScore(score + 1);
    } else {
      setGameStatus("❌ Wrong! Try again.");
    }
  };

  const resetGame = () => {
    const newTarget = generateRandomColor();
    setTargetColor(newTarget);
    setColorOptions(generateColorOptions(newTarget));
    setGameStatus("");
  };

  return (
    <div className="game-container">
      <h2 data-testid="gameInstructions">Guess the correct color!</h2>

      <div
        className="color-box"
        style={{ backgroundColor: targetColor }}
        data-testid="colorBox"
      ></div>

      <div className="color-options">
        {colorOptions.map((color, index) => (
          <button
            key={index}
            className="color-option"
            style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)}
            data-testid="colorOption"
          ></button>
        ))}
      </div>

      <p data-testid="gameStatus" className="game-status">{gameStatus}</p>
      <p data-testid="score" className="score">Score: {score}</p>

      <button onClick={resetGame} data-testid="newGameButton" className="reset-btn">
        New Game
      </button>
    </div>
  );
};

export default ColorGame;
