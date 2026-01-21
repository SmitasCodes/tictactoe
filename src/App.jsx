import React, { useState } from "react";
import PlayerSetup from "./PlayerSetup";
import Board from "./Board.jsx";

const App = () => {
  const [gameStart, setGameStart] = useState(false);
  const [players, setPlayers] = useState({
    player1: { name: "Player 1", symbol: "X" },
    player2: { name: "Player 2", symbol: "0" },
  });

  return (
    <>
      {!gameStart ? (
        <PlayerSetup
          players={players}
          setPlayers={setPlayers}
          setGameStart={setGameStart}
        />
      ) : (
        <Board players={players} />
      )}
    </>
  );
};

export default App;
