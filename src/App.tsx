import { useState } from "react";
import "./App.css";
import Block from "./components/Block";

const App = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState("X");
  const [gameOver, setGameOver] = useState(false);
  const [isTie, setIsTie] = useState(false);

  const checkWinner = (state: string[]) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [0, 4, 8],
      [2, 4, 6],
      [2, 5, 8]
    ];
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
        return true;
      }
    }
    return false;
  };

  const checkTie = (state: string[]) => {
    return state.every((cell) => cell !== null);
  };

  const handleClick = (index: number) => {
    if (gameOver || state[index] !== null) return;

    const newState = [...state];
    newState[index] = currentTurn;
    setState(newState);

    if (checkWinner(newState)) {
      setGameOver(true);
      return;
    }

    if (checkTie(newState)) {
      setIsTie(true);
      setGameOver(true);
      return;
    }

    setCurrentTurn(currentTurn === "X" ? "O" : "X");
  };

  return (
    <div className="game">
      <div className="heading">
        <div className="nameOfTheGame">Tic Tac Toe</div>
        {gameOver && (
  <div className={`congrats visible gameresult`}>
    {!isTie ? `We have a winner! Congrats ${currentTurn}!` : "It's a tie!"}
  </div>
)}

  </div>
      <div className="board">
        <div className="rows">
          {[0, 1, 2].map((row) => (
            <div key={row} className="row">
              {[0, 1, 2].map((col) => {
                const index = row * 3 + col;
                return (
                  <Block
                    key={index}
                    value={state[index]}
                    onClick={() => handleClick(index)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
