import "./App.css";
import { useState } from "react";
import Block from "./components/Block";
const filledSquares: number[] = [];
const App = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState("X");

  const checkWinner = (state: any[]) => {
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < win.length; i++) {
      const [a, b, c] = win[i];
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c])
        return true;
    }
    return false;
  };
  //tieChecker arranges filledSquares in order so that it matches tieWhatever contents. When the whole game area is filled it will check if it's a tie.
  const tieChecker = (numb: number) => {
    filledSquares[numb] = numb;
    const tieIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const isTie = tieIndexes.every((value, index) => value === filledSquares[index]);
    if (isTie) {
      return true;
    }
    else {
      return false;
    }
  }
  const handleClick = (index: number) => {
    const stateCopy = Array.from(state);
    if (stateCopy[index] !== null) return alert(`Choose an empty square`);
    stateCopy[index] = currentTurn;
    setState(stateCopy);
    // check if someone wins
    const win = checkWinner(stateCopy);
    const tie = tieChecker(index);
    if (win) {
      alert(`${currentTurn}won the game`);
      return
    }
    else if (tie) {
      alert(`Tie game`);
      return
    }
    setCurrentTurn(currentTurn === "X" ? "O" : "X");
  };
  return (
    <div className="board">
      <div className="row">
        <Block onClick={() => handleClick(0)} value={state[0]} />
        <Block onClick={() => handleClick(1)} value={state[1]} />
        <Block onClick={() => handleClick(2)} value={state[2]} />
      </div>
      <div className="row">
        <Block onClick={() => handleClick(3)} value={state[3]} />
        <Block onClick={() => handleClick(4)} value={state[4]} />
        <Block onClick={() => handleClick(5)} value={state[5]} />
      </div>
      <div className="row">
        <Block onClick={() => handleClick(6)} value={state[6]} />
        <Block onClick={() => handleClick(7)} value={state[7]} />
        <Block onClick={() => handleClick(8)} value={state[8]} />
      </div>
    </div>
  );
};
export default App;
