import React, { useMemo, useState } from "react";
import { initialGameBoard, WINNING_COMBINATIONS } from "./data/gameArrays";

const Board = ({ players, setGameStart }) => {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  const {
    player1: { name: player1Name, symbol: player1Symbol },
    player2: { name: player2Name, symbol: player2Symbol },
  } = players;

  const moves = gameBoard.flat().filter(Boolean).length;

  const winner = useMemo(() => {
    if (moves === 9) return "draw";
    for (const combination of WINNING_COMBINATIONS) {
      const a = gameBoard[combination[0].row][combination[0].col];
      const b = gameBoard[combination[1].row][combination[1].col];
      const c = gameBoard[combination[2].row][combination[2].col];

      if (a && a === b && b === c) {
        return a === player1Symbol ? player1Name : player2Name;
      }
    }

    return null;
  }, [gameBoard]);

  const activePlayer = winner
    ? null
    : moves % 2 === 0
      ? player1Symbol
      : player2Symbol;

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
      <div className="h-96 w-96 bg-red-200 grid grid-rows-3 grid-cols-3 gap-2">
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
        <div className="absolute bg-gray-900/90 inset-0 flex justify-center items-center">
          <div className="bg-yellow-400 text-center flex-wrap w-102 p-6 rounded-md">
            <h2 className="font-bold pb-3 text-3xl">
              {winner === "draw" ? "Draw" : "Winner is " + winner}
            </h2>
            <div className="flex justify-around w-full">
              <button
                className="bg-amber-600 px-2 rounded-xl text-lg cursor-pointer"
                onClick={() => setGameBoard(initialGameBoard)}
              >
                Play again
              </button>
              <button
                className="bg-amber-600 px-2 rounded-xl text-lg cursor-pointer"
                onClick={() => setGameStart(false)}
              >
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
