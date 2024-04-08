"use client";
import React from "react";
import Stopwatch from "./Stopwatch";

const NumberPad = ({ onNumberInput, onUndoClick }) => {
  const handleNumberClick = (number) => {
    return () => onNumberInput(number); // Return a function that calls onNumberInput with the number
  };

  return (
    <div className="game-controls flex flex-col items-center space-y-4">
      <div className="flex space-x-4">
        <button
          onClick={handleNumberClick(null)}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded"
        >
          Erase
        </button>
        <button
          onClick={onUndoClick}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Undo
        </button>
      </div>
      <div className="numberPad grid grid-cols-3 gap-4">
        {Array.from({ length: 9 }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            className="numberButton bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-400"
            onClick={handleNumberClick(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NumberPad;
