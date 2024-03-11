import { useState, useEffect } from "react";
import "./App.css";
import Block from "./components/Block";

const App = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState("X");
  const [gameOver, setGameOver] = useState(false);
  const [isTie, setIsTie] = useState(false);

  useEffect(() => {
    if (!gameOver && currentTurn === "O") {
      // Computer's turn
      setTimeout(() => {
        const emptyCells = state.reduce((acc, cell, index) => {
          if (cell === null) {
            acc.push(index);
          }
          return acc;
        }, []);

        // Smart move: Try to win if possible, otherwise block the player
        let computerMove;
        for (let i = 0; i < emptyCells.length; i++) {
          const newState = [...state];
          newState[emptyCells[i]] = "O";
          if (checkWinner(newState)) {
            computerMove = emptyCells[i];
            break;
          }
          newState[emptyCells[i]] = "X";
          if (checkWinner(newState)) {
            computerMove = emptyCells[i];
            break;
          }
        }
        if (!computerMove) {
          // If no winning or blocking move, choose a random empty cell
          const randomIndex = Math.floor(Math.random() * emptyCells.length);
          computerMove = emptyCells[randomIndex];
        }

        const newState = [...state];
        newState[computerMove] = "O";
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

        setCurrentTurn("X");
      }, 500); // Add a slight delay for the computer's move
    }
  }, [state, currentTurn, gameOver]);

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
    if (gameOver || state[index] !== null || currentTurn === "O") return;

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

    setCurrentTurn("O");
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



/* import { useState } from "react";
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
 */