import { useEffect, useRef, useState } from "react";

const PlayerSetup = ({ players, setPlayers, setGameStart }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [error, setError] = useState(null);
  const inputName1Ref = useRef(null);
  const inputName2Ref = useRef(null);

  useEffect(() => {
    if (isEditing === "player1") inputName1Ref.current.focus();
    if (isEditing === "player2") inputName2Ref.current.focus();
  }, [isEditing]);

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
      if (players[player].name.length < 3) {
        setError("Name too short (min 3 char).");
        return false;
      }
      if (players[player].name.length > 20) {
        setError("Name too long (max 20 char).");
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
        if (player[1].name.length < 3 || player[1].name.length > 20) {
          const playerString =
            player[0] === "player1" ? "Player 1" : "Player 2";
          updatePlayer("name", player[0], playerString);
        }
      });

      setIsEditing(player);
    }

    setError(null);
  };

  const handleKeyDown = (e, player) => {
    console.log("sd");
    if (e.key === "Enter") handleEdit(player);
  };

  return (
    <div className="bg-[#AF47D2] px-6 py-3 rounded-sm">
      <h2 className="sm:text-2xl md:text-1xl text-xl font-bold text-center pb-4">
        Welcome to Tic-tac-toe game!
      </h2>

      <div className="flex justify-between pb-2">
        <input
          type="text"
          value={players.player1.name}
          ref={inputName1Ref}
          disabled={isEditing !== "player1"}
          onChange={(e) => updatePlayer("name", "player1", e.target.value)}
          className={`rounded-md border-2 border-transparent outline-none px-0.5 
              ${isEditing === "player1" && "border-[#cc7200]!"}
            `}
          onKeyDown={(e) => handleKeyDown(e, "player1")}
        />
        <button
          className="bg-[#d17a07] hover:bg-[#bc6e06] py-0.5 px-2 rounded-lg cursor-pointer"
          onClick={() => {
            updatePlayer("symbol", "player1", players.player1.symbol);
          }}
        >
          {players.player1.symbol}
        </button>
        <button
          className={`${isEditing === "player1" ? "bg-[#b39900]" : "bg-[#ffdb00]"} hover:bg-[#e6c500] px-2 rounded-xl cursor-pointer w-12 `}
          onClick={() => handleEdit("player1")}
        >
          {isEditing === "player1" ? "Save" : "Edit"}
        </button>
      </div>

      <div className="flex justify-between pb-2">
        <input
          type="text"
          value={players.player2.name}
          ref={inputName2Ref}
          disabled={isEditing !== "player2"}
          className={`rounded-md border-2 border-transparent outline-none px-0.5 
              ${isEditing === "player2" && "border-[#cc7200]!"}
             `}
          onChange={(e) => updatePlayer("name", "player2", e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, "player2")}
        />
        <button
          className="bg-[#d17a07] hover:bg-[#bc6e06] py-0.5 px-2 rounded-lg  cursor-pointer"
          onClick={() => {
            updatePlayer("symbol", "player2", players.player2.symbol);
          }}
        >
          {players.player2.symbol}
        </button>
        <button
          className={`${isEditing === "player2" ? "bg-[#b39900]" : "bg-[#ffdb00]"} hover:bg-[#e6c500] px-2 rounded-xl cursor-pointer  w-12`}
          onClick={() => handleEdit("player2")}
        >
          {isEditing === "player2" ? "Save" : "Edit"}
        </button>
      </div>

      {error && (
        <p className="text-red-700 max-w-[300px] wrap-break-words">{error}</p>
      )}

      <div className="flex justify-center pt-2">
        <button
          className="bg-[#ff8f00] hover:bg-[#e68100] px-4 py-0.5 text-md sm:text-lg rounded-3xl cursor-pointer"
          onClick={() => inputsValidation() && setGameStart(true)}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default PlayerSetup;
