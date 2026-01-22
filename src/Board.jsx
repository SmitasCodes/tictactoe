import React, { useState } from "react";
import { initialGameBoard, WINNING_COMBINATIONS } from "./data/gameArrays";

const Board = ({ players }) => {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  const player1Symbol = players.player1.symbol;
  const player2Symbol = players.player2.symbol;

  const activePlayer = () => {
    let player1Cols = 0;
    let player2Cols = 0;

    for (let row of gameBoard) {
      for (let col of row) {
        if (col === player1Symbol) player1Cols++;
        if (col === player2Symbol) player2Cols++;
      }
    }

    return player1Cols === player2Cols ? player1Symbol : player2Symbol;
  };

  const buttonHandler = (rowIndex, colIndex) => {
    setGameBoard((prevGameBoard) => {
      let updatedGameBoard = [...prevGameBoard];
      const updatedRow = [...prevGameBoard[rowIndex]];
      updatedRow[colIndex] = activePlayer();
      updatedGameBoard[rowIndex] = updatedRow;
      return updatedGameBoard;
    });
  };

  for (const combination of WINNING_COMBINATIONS) {
    const first = gameBoard[combination[0].row][combination[0].col];
    const second = gameBoard[combination[1].row][combination[1].col];
    const third = gameBoard[combination[2].row][combination[2].col];

    if (first && first === second && second === third) {
      console.log("chicken dinner");
    }
  }

  return (
    <div className="flex flex-col">
      <ul className="flex justify-around pb-2">
        <li className="bg-yellow-400 rounded-sm px-2 py-0.5 flex gap-2">
          <span>{players.player1.name}</span>
          <span className="bg-blue-900 px-1.5 rounded-lg">
            {players.player1.symbol}
          </span>
        </li>
        <li className="bg-yellow-400 rounded-sm px-2 py-0.5 flex gap-2">
          <span>{players.player2.name}</span>
          <span className="bg-blue-900 px-1.5 rounded-lg">
            {players.player2.symbol}
          </span>
        </li>
      </ul>
      <div className="h-96 w-96 bg-red-200 grid grid-flow-row grid-cols-3 gap-2">
        {gameBoard.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <button
              className="bg-red-400 cursor-pointer"
              key={colIndex}
              onClick={() => buttonHandler(rowIndex, colIndex)}
            >
              {col}
            </button>
          )),
        )}
      </div>
    </div>
  );
};

export default Board;
