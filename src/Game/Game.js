import React, { useState, useEffect } from 'react';
import Board from '../Components/Board';

export const initialGrid = '_'.repeat(9).split('').map( () => null);
export const players = [0, 1];
export const intitialState = {
  grid: [...initialGrid],
  currentPlayer: players[0],
  gameOver: false,
  winner: undefined,
};

export const findWinner = (grid) => {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let winner = undefined;
  for(let combo of winningCombos) {
    let player = grid[combo[0]];
    for(let cell of combo) {
      if(player === grid[cell] && grid[cell] !== null) {
        winner = player;
      } else {
        winner = undefined;
        break;
      }
    };
    if(winner !== undefined) {
      break;
    }
  };
  return winner;
}

const textFriendlyPlayerIcons = ['○', '×'];

function Game() {
    const [grid, setGrid] = useState(intitialState.grid);
    const [currentPlayer, setCurrentPlayer] = useState(intitialState.currentPlayer);
    const [winner, setWinner] = useState(intitialState.winner);
  
    const handleBoardClick = (cell) => {
      if(grid[cell] === null && winner === undefined) {
        // Map over the grid and update the clicked cell's value
        const newGrid = grid.map( (x, i) => (i === cell ? currentPlayer : x));
        setGrid(newGrid);
        setCurrentPlayer(currentPlayer === players[0] ? players[1] : players[0]);
      }
    };

    const checkWinner = () => {
      const winner = findWinner(grid);
      if(winner !== undefined) {
        setWinner(winner);
      }
    };

    const isBoardFilled = () => {
      return grid.every( cell => cell !== null);
    }

    const reset = () => {
      setGrid(intitialState.grid);
      setCurrentPlayer(intitialState.currentPlayer);
      setWinner(undefined);
    };

    // Call checkWinner on useEffect to ensure winner is checked
    // every time the grid changes.
    useEffect(checkWinner, [grid]);

    let winnerMessage = '';
    if(isBoardFilled() && winner === undefined) {
      winnerMessage = 'It\'s a tie!';
    } else if(winner !== undefined) {
      winnerMessage = `${textFriendlyPlayerIcons[winner]} wins!`;
    }

    return (
        <div className="game">
            <h1>Tic tac toe</h1>
            <Board grid={grid} onClick={handleBoardClick} />
            <div className="status-bar">
              <div className="status">
                { winnerMessage }
              </div>
              <button className="btn btn--reset" onClick={reset}>Reset</button>
            </div>
        </div>
    );
}


export default Game;
