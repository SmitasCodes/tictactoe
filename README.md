# Tic Tac Toe — React

Tic Tac Toe game built with **React** and **Tailwind CSS**.  
Supports custom player names, dynamic turn highlighting, win animations, and draw detection.
This project was built to practice state management, derived state, and UI feedback in React.

Live demo: https://tictactoe-ten-lime.vercel.app/

---

## Features

- 🎮 Classic 3×3 Tic Tac Toe gameplay
- ✏️ Editable player names with validation
- 🔁 Switchable player symbols (X / O)
- 🎯 Active player highlighting
- 🏆 Automatic win detection
- 🤝 Draw detection
- ✨ Winning combination animation
- 🔄 Restart game or re-customize players
- 📱 Responsive design

---

## Tech Stack

- **React**
- **Tailwind CSS**
- **Vercel** (deployment)

---

## How It Works

- The game board is stored as a 2D array.
- The active player is derived from the number of moves.
- The winner is computed using predefined winning combinations.
- UI updates automatically based on state changes.

---

## Getting Started Locally

```bash

git clone https://github.com/SmitasCodes/tictactoe/
cd tactactoe
npm install
npm run dev
