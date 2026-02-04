import React, { useEffect, useMemo, useState } from "react";
import { initialGameBoard, WINNING_COMBINATIONS } from "./data/gameArrays";

const Board = ({ players, setGameStart }) => {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  const {
    player1: { name: player1Name, symbol: player1Symbol },
    player2: { name: player2Name, symbol: player2Symbol },
  } = players;
  const [showModal, setShowModal] = useState(false);
  const moves = gameBoard.flat().filter(Boolean).length;

  const restartGame = () => {
    setGameBoard(initialGameBoard);
    setShowModal(false);
  };

  const winner = useMemo(() => {
    for (const combination of WINNING_COMBINATIONS) {
      const a = gameBoard[combination[0].row][combination[0].col];
      const b = gameBoard[combination[1].row][combination[1].col];
      const c = gameBoard[combination[2].row][combination[2].col];

      if (a && a === b && b === c) {
        return a === player1Symbol
          ? { name: player1Name, combo: combination }
          : { name: player2Name, combo: combination };
      }
    }

    if (moves === 9) return { name: "draw", combo: [] };

    return null;
  }, [gameBoard]);

  useEffect(() => {
    if (winner && winner.name != "draw") {
      console.log("timer");
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 2600);

      return () => clearTimeout(timer);
    }

    if (winner&&winner.name === "draw") {
      setShowModal(true);
    }
  }, [winner]);

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

  const highlightWinningCombo = (rowIndex, colIndex) => {
    if (!winner || winner.name === "draw") return 0;
    let squareNumber = winner.combo.findIndex(
      (square) => square.row === rowIndex && square.col === colIndex,
    );
    return ++squareNumber;
  };

  const animationDelay = (rowIndex, colIndex) => {
    if (highlightWinningCombo(rowIndex, colIndex) === 1) {
      return "bg-[#1fb91f] animate-[pulse_1s_ease-in-out_200ms_1]";
    }
    if (highlightWinningCombo(rowIndex, colIndex) === 2) {
      return "bg-[#1fb91f] animate-[pulse_1s_ease-in-out_800ms_1]";
    }
    if (highlightWinningCombo(rowIndex, colIndex) === 3) {
      return "bg-[#1fb91f] animate-[pulse_1s_ease-in-out_1400ms_1]";
    }
  };

  return (
    <div className="flex flex-col bg-[#AF47D2] p-3 rounded-md ">
      <ul className="flex justify-around pb-2">
        <li
          className={`${player1Symbol === activePlayer ? "bg-[#FF8F00]" : "bg-[#FFDB00]"} rounded-sm px-2 py-0.5 flex gap-2`}
        >
          <span>{player1Name}</span>
          <span className="bg-[#d17a07] px-1.5 rounded-lg">
            {player1Symbol}
          </span>
        </li>
        <li
          className={`${player2Symbol === activePlayer ? "bg-[#FF8F00]" : "bg-[#FFDB00]"} rounded-sm px-2 py-0.5 flex gap-2`}
        >
          <span>{player2Name}</span>
          <span className="bg-[#bd6e07] px-1.5 rounded-lg">
            {player2Symbol}
          </span>
        </li>
      </ul>
      <div className="h-96 w-96 bg-[#afbfcc] grid grid-rows-3 grid-cols-3 gap-2 p-1 rounded-md">
        {gameBoard.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <button
              className={`${winner && highlightWinningCombo(rowIndex, colIndex) ? animationDelay(rowIndex, colIndex) : col ? "bg-[#e68100]" : "bg-[#ff8f00]"} cursor-pointer font-bold text-5xl rounded-md`}
              key={`${rowIndex}-${colIndex}`}
              onClick={() => buttonHandler(rowIndex, colIndex)}
            >
              {col}
            </button>
          )),
        )}
      </div>

      {winner && showModal && (
        <div className="absolute bg-gray-900/90 inset-0 flex justify-center items-center">
          <div className="bg-[#bf6cdb] text-center flex-wrap w-102 p-6 rounded-md">
            <h2 className="font-bold pb-3 text-3xl">
              {winner.name === "draw" ? "Draw" : "Winner is " + winner.name}
            </h2>
            <div className="flex justify-around w-full">
              <button
                className="bg-[#ffe64d] hover:bg-[#e6c500] px-2 rounded-xl text-lg cursor-pointer"
                onClick={() => restartGame()}
              >
                Play again
              </button>
              <button
                className="bg-[#ffe64d] hover:bg-[#e6c500] px-2 rounded-xl text-lg cursor-pointer"
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
