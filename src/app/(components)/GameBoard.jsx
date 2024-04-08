"use client";
import React, { useState, useEffect } from "react";
import SudokuGrid from "./SudokuGrid";
import NumberPad from "./NumberPad";

const GameBoard = () => {
  const initialGridState = Array(9)
    .fill()
    .map(() => Array(9).fill(""));

  const solveSudoku = (board, index = 0) => {
    // Board is filled
    if (index > 80) {
      return true;
    }

    // Row and Column index
    const row = Math.floor(index / 9);
    const col = index % 9;

    if (board[row][col] !== "") {
      return solveSudoku(board, index + 1);
    }

    for (let number = 1; number < 10; number++) {
      if (isValidPlacement(board, row, col, number.toString())) {
        board[row][col] = number.toString();
        if (solveSudoku(board, index + 1)) {
          return true;
        }
        board[row][col] = ""; // Reset the cell
      }
    }
    return false;
  };
  const isValidPlacement = (board, row, col, digit) => {
    // Check if digit already exists in the same row
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === digit) {
        return false;
      }
    }

    // Check if digit already exists in the same column
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === digit) {
        return false;
      }
    }

    // Check if digit already exists in the same 3x3 subgrid
    const subgridStartRow = Math.floor(row / 3) * 3;
    const subgridStartCol = Math.floor(col / 3) * 3;
    for (let i = subgridStartRow; i < subgridStartRow + 3; i++) {
      for (let j = subgridStartCol; j < subgridStartCol + 3; j++) {
        if (board[i][j] === digit) {
          return false;
        }
      }
    }

    return true; // If digit doesn't violate any Sudoku rules
  };

  const checkBoardCompletion = (board, solution) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] !== solution[i][j]) {
          return false;
        }
      }
    }
    return true;
  };

  const isBoardFilled = (board) => {
    for (const row of board) {
      for (const cell of row) {
        if (cell === "") {
          return false;
        }
      }
    }
    return true; // No empty cells found, board is fully filled
  };

  // What the user sees and inputs values in
  let board = [
    ["5", "3", "", "", "7", "", "", "", ""],
    ["6", "", "", "1", "9", "5", "", "", ""],
    ["", "9", "8", "", "", "", "", "6", ""],
    ["8", "", "", "", "6", "", "", "", "3"],
    ["4", "", "", "8", "", "3", "", "", "1"],
    ["7", "", "", "", "2", "", "", "", "6"],
    ["", "6", "", "", "", "", "2", "8", ""],
    ["", "", "", "4", "1", "9", "", "", "5"],
    ["", "", "", "", "8", "", "", "7", "9"],
  ];

  // A clone of the board that will be solved to compare against user input
  let boardSolution = [
    ["5", "3", "", "", "7", "", "", "", ""],
    ["6", "", "", "1", "9", "5", "", "", ""],
    ["", "9", "8", "", "", "", "", "6", ""],
    ["8", "", "", "", "6", "", "", "", "3"],
    ["4", "", "", "8", "", "3", "", "", "1"],
    ["7", "", "", "", "2", "", "", "", "6"],
    ["", "6", "", "", "", "", "2", "8", ""],
    ["", "", "", "4", "1", "9", "", "", "5"],
    ["", "", "", "", "8", "", "", "7", "9"],
  ];
  // Calling function to alter clone such that solutionBoard actually contains the solution now
  solveSudoku(boardSolution);

  // For undo buttton
  const [grid, setGrid] = useState(board);
  const [actionHistory, setActionHistory] = useState([board]);

  const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
  const [isCorrectInput, setCorrectInput] = useState(true);

  useEffect(() => {
    //console.log("isBoardFilled: ", isBoardFilled(grid));
    if (isBoardFilled(grid)) {
      const isCompletedSuccessfully = checkBoardCompletion(grid, boardSolution);
      //console.log("isCompletedSuccessfully: ", isCompletedSuccessfully);
      if (isCompletedSuccessfully) {
        alert("Congratulations! You have successfully completed the puzzle!");
      }
    }
  }, [grid]); // This effect depends on the 'grid' state.

  const handleCellSelect = (row, col) => {
    // Check if the clicked cell is already selected
    if (selectedCell.row === row && selectedCell.col === col) {
      // If the cell is already selected, clear the selection
      setSelectedCell({ row: null, col: null });
    } else {
      // If it's a different cell, update the selection
      setSelectedCell({ row, col });
    }
  };

  const handleNumberInput = (number) => {
    if (selectedCell.row !== null && selectedCell.col !== null) {
      // Save the current grid state to history before updating
      setActionHistory((prevHistory) => [
        ...prevHistory,
        JSON.parse(JSON.stringify(grid)),
      ]); // Example of deep cloning

      /*
      const newGrid = grid.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
          rowIndex === selectedCell.row && colIndex === selectedCell.col
            ? number !== null &&
              isValidPlacement(grid, rowIndex, colIndex, number.toString())
              ? number.toString()
              : ""
            : cell
        )
      );
      */

      const newGrid = grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          // Default to leaving the cell unchanged
          let newValue = cell;

          // Check if the current cell is the selected cell
          if (rowIndex === selectedCell.row && colIndex === selectedCell.col) {
            if (number !== null) {
              // Convert number to string once for reusability
              const numberStr = number.toString();

              // Check if the placement is valid
              if (isValidPlacement(grid, rowIndex, colIndex, numberStr)) {
                // Valid number placement, update the cell
                newValue = numberStr;

                // Check if the input matches the solution
                const cellsMatch =
                  newValue == boardSolution[rowIndex][colIndex];

                if (cellsMatch) {
                  /*
                  console.log("newValue: ", newValue);
                  console.log(
                    "solutionBoard: ",
                    boardSolution[selectedCell.row][selectedCell.col].toString()
                  );
                  alert("Correct number placement!");
                  */
                  setCorrectInput(true);
                } else {
                  /*
                  console.log("newValue: ", newValue);
                  console.log(
                    "solutionBoard: ",
                    boardSolution[selectedCell.row][selectedCell.col].toString()
                  );
                  alert("Incorrect number placement");
                  */
                  setCorrectInput(false);
                }
                //setCorrectInput(true); // Set the feedback state to true, indicating a correct move
              } else {
                // Invalid placement, but keep the user's input to show it's incorrect
                newValue = numberStr;
                setCorrectInput(false); // Set the feedback state to false, indicating an incorrect move
              }
            } else {
              // If number is null, the user wants to clear the cell
              newValue = ""; // Clear the cell
              setCorrectInput(true);
            }
          }

          return newValue; // Apply the determined value
        })
      );

      setGrid(newGrid);
    }

    /*
    console.log("isBoardFilled: ", isBoardFilled(grid));
    if (isBoardFilled(grid)) {
      console.log("isBoardFilled: ", isBoardFilled(grid));
      const isCompletedSuccessfully = checkBoardCompletion(grid, boardSolution);
      console.log("isCompletedSuccessfully: ", isCompletedSuccessfully);
      // Handle the completion status accordingly
      if (isCompletedSuccessfully) {
        alert("Congratulations! You have successfully completed the puzzle!");
      }
    }
    */
  };
  const handleUndo = () => {
    setActionHistory((prevHistory) => {
      if (prevHistory.length > 1) {
        const newHistory = prevHistory.slice(0, -1); // Remove the last state
        const lastGridState = newHistory[newHistory.length - 1];
        console.log(
          "Restoring grid state from history:",
          JSON.parse(JSON.stringify(lastGridState))
        );

        setGrid(JSON.parse(JSON.stringify(lastGridState))); // Ensure deep cloning if necessary
        return newHistory;
      }
      return prevHistory;
    });
  };

  /*
  if (solveSudoku(board)) {
    console.log("Sudoku solved!");
    console.log(board); // Log the solved board to inspect the solution
  } else {
    console.log("No solution found.");
  }
  /*

  /*
  const generateSolution = (currentGrid) => {
    //let i=0;
    for (let row = 0; row < 9; row++) {
      for (let col = 0; i < 9; col++) {
        if (currentGrid[row][col] === "") {
          for (let i = 0; i <= 9; i++) {
            if (isValidPlacement(currentGrid, row, col, i)) {
              board[row][col] = i.toString(); // place in cell
              if (generateSolution(currentGrid)) {
                return true;
              } else {
                board[row][col] = ""; // Undo and backtrack
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  };
  */

  return (
    <div className="flex justify-center items-center">
      <SudokuGrid
        grid={grid}
        selectedCell={selectedCell}
        isCorrectInput={isCorrectInput}
        onCellSelect={handleCellSelect}
      />
      <NumberPad onNumberInput={handleNumberInput} onUndoClick={handleUndo} />
    </div>
  );
};

export default GameBoard;
