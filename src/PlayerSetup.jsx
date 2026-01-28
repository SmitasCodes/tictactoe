import { useState } from "react";

const PlayerSetup = ({ players, setPlayers, setGameStart }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [error, setError] = useState(null);

  const updatePlayer = (type, playerId, value) => {
    setPlayers((prev) => {
      if (type === "name")
        return {
          ...prev,
          [playerId]: { ...prev[playerId], name: value },
        };

      if (type === "symbol") {
        const newSymP1 = prev.player1.symbol === "X" ? "0" : "X";
        const newSymP2 = newSymP1 === "X" ? "0" : "X";
        return {
          player1: { ...prev.player1, symbol: newSymP1 },
          player2: { ...prev.player2, symbol: newSymP2 },
        };
      }

      return prev;
    });
  };

  const inputsValidation = () => {
    const playersName = ["player1", "player2"];

    for (let player of playersName) {
      if (players[player].name.length <= 3) {
        setError("Player name must be longer than 3 characters");
        return false;
      }
      if (players[player].name.length >= 20) {
        setError("Player name cannot be longer than 20 characters");
        return false;
      }
    }

    return true;
  };

  const handleEdit = (player) => {
    if (player == isEditing) {
      if (!inputsValidation()) return;
      setIsEditing(null);
    } else {
      // Triggers on each edit click, checks if user name is valid before clicking another player to edit. If not valid, reverts name to original
      Object.entries(players).forEach((player) => {
        if (player[1].name.length <= 3 || player[1].name.length >= 20) {
          const playerString =
            player[0] === "player1" ? "Player 1" : "Player 2";
          updatePlayer("name", player[0], playerString);
        }
      });

      setIsEditing(player);
    }

    setError(null);
  };

  return (
    <div className="bg-yellow-200 w-96 p-4 rounded-sm">
      <h2 className="text-xl font-bold text-center pb-4">
        Welcome to tic tac toe game. You can press start below!
      </h2>

      <div className="flex justify-between pb-2">
        <input
          type="text"
          value={players.player1.name}
          disabled={isEditing !== "player1"}
          onChange={(e) => updatePlayer("name", "player1", e.target.value)}
          className={`rounded-md border-2 border-transparent outline-none px-0.5
              ${isEditing === "player1" && " border-yellow-800"}
            `}
        />

        <button
          className="bg-yellow-600 py-0.5 px-2 rounded-lg cursor-pointer"
          onClick={() => {
            updatePlayer("symbol", "player1", players.player1.symbol);
          }}
        >
          {players.player1.symbol}
        </button>

        <button
          className="bg-amber-400 px-2 rounded-xl cursor-pointer"
          onClick={() => handleEdit("player1")}
        >
          {isEditing === "player1" ? "Save" : "Edit"}
        </button>
      </div>

      <div className="flex justify-between pb-2">
        <input
          type="text"
          value={players.player2.name}
          disabled={isEditing !== "player2"}
          className={`rounded-md border-2 border-transparent outline-none px-0.5
              ${isEditing === "player2" && " border-yellow-800"}
            `}
          onChange={(e) => updatePlayer("name", "player2", e.target.value)}
        />
        <button
          className="bg-yellow-600 py-0.5 px-2 rounded-lg  cursor-pointer"
          onClick={() => {
            updatePlayer("symbol", "player2", players.player2.symbol);
          }}
        >
          {players.player2.symbol}
        </button>

        <button
          className="bg-amber-400 px-2 rounded-xl cursor-pointer"
          onClick={() => handleEdit("player2")}
        >
          {isEditing === "player2" ? "Save" : "Edit"}
        </button>
      </div>

      {error && <p className="text-red-700">{error}</p>}

      <div className="flex justify-center pt-2">
        <button
          className="bg-amber-500 px-4 py-0.5 text-lg rounded-3xl cursor-pointer"
          onClick={() => inputsValidation() && setGameStart(true)}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default PlayerSetup;
