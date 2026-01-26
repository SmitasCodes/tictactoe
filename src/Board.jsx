import React, { useState } from "react";
import { initialGameBoard, WINNING_COMBINATIONS } from "./data/gameArrays";

const Board = ({ players }) => {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  const player1Symbol = players.player1.symbol;
  const player2Symbol = players.player2.symbol;
  const player1Name = players.player1.name;
  const player2Name = players.player2.name;
  let winner = "";

  const moves = gameBoard.flat().filter(Boolean).length;
  const activePlayer = moves % 2 === 0 ? player1Symbol : player2Symbol;

  const buttonHandler = (rowIndex, colIndex) => {
    if (winner) return;
    if (gameBoard[rowIndex][colIndex]) return;
    setGameBoard((prevGameBoard) => {
      let updatedGameBoard = [...prevGameBoard];
      const updatedRow = [...prevGameBoard[rowIndex]];
      updatedRow[colIndex] = activePlayer;
      updatedGameBoard[rowIndex] = updatedRow;
      return updatedGameBoard;
    });
  };

  for (const combination of WINNING_COMBINATIONS) {
    const first = gameBoard[combination[0].row][combination[0].col];
    const second = gameBoard[combination[1].row][combination[1].col];
    const third = gameBoard[combination[2].row][combination[2].col];

    if (first && first === second && second === third) {
      first === player1Symbol ? (winner = player1Name) : (winner = player2Name);
    }
  }

  return (
    <div className="flex flex-col">
      <ul className="flex justify-around pb-2">
        <li
          className={`${player1Symbol === activePlayer ? "bg-amber-600" : "bg-yellow-400"} rounded-sm px-2 py-0.5 flex gap-2`}
        >
          <span>{player1Name}</span>
          <span className="bg-blue-900 px-1.5 rounded-lg">{player1Symbol}</span>
        </li>
        <li
          className={`${player2Symbol === activePlayer ? "bg-amber-600" : "bg-yellow-400"} rounded-sm px-2 py-0.5 flex gap-2`}
        >
          <span>{player2Name}</span>
          <span className="bg-blue-900 px-1.5 rounded-lg">{player2Symbol}</span>
        </li>
      </ul>
      <div className="h-96 w-96 bg-red-200 grid grid-flow-row grid-cols-3 gap-2">
        {gameBoard.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <button
              className="bg-red-400 cursor-pointer"
              key={`${rowIndex}-${colIndex}`}
              onClick={() => buttonHandler(rowIndex, colIndex)}
            >
              {col}
            </button>
          )),
        )}
      </div>

      {winner && (
        <div className="absolute h-screen w-full bg-gray-900/90 top-0 left-0  flex justify-center items-center">
          <div className="bg-yellow-400 text-center flex-wrap w-102 p-6 rounded-md">
            <h2 className="font-bold pb-3 text-3xl">Winner is {winner}</h2>
            <div className="flex justify-around w-full">
              <button className="bg-amber-600 px-2 rounded-xl text-lg cursor-pointer">
                Play again
              </button>
              <button className="bg-amber-600 px-2 rounded-xl text-lg cursor-pointer">
                Customize
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
