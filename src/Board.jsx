import React, { useState } from "react";
import { initialGameBoard, WINNING_COMBINATIONS } from "./data/gameArrays";

const Board = ({ players }) => {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  const activePlayer = () => {
    // let xCols = 0;
    // let oCols = 0;

    // for (let row of gameBoard) {
    //   for (let col of row) {
    //     if (col === "X") xCols++;
    //     if (col === "0") oCols++;
    //   }
    // }

    // return xCols === oCols ? "X" : "0";

    let player1Cols = 0;
    let player2Cols = 0;

    for (let row of gameBoard) {
      for (let col of row) {
        if (col === players.player1.symbol) player1Cols++;
        if (col === players.player2.symbol) player2Cols++;
      }
    }

    return player1Cols === player2Cols ? "X" : "0";
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
    <>
      <div>
        {players.player1.name}
        {players.player2.name}
      </div>
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
    </>
  );
};

export default Board;
