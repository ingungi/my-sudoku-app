"use client";
import React, { useState } from "react";

const SudokuGrid = ({ grid, selectedCell, isCorrectInput, onCellSelect }) => {
  /*
  const subgridStartRow = Math.floor(selectedCell.row / 3) * 3;
  const subgridStartCol = Math.floor(selectedCell.col / 3) * 3;

  const subgridEndRow = subgridStartRow + 2;
  const subgridEndCol = subgridStartCol + 2;

  const sameSubgridRow =
    subgridStartRow <= selectedCell.row && selectedCell.row <= subgridEndRow;
  const sameSubgridCol =
    subgridStartCol <= selectedCell.col && selectedCell.col <= subgridEndCol;

  return (
    <div className="grid">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`cell ${
              (selectedCell.row === rowIndex &&
                selectedCell.col === colIndex) ||
              selectedCell.col === colIndex ||
              selectedCell.row === rowIndex ||
              (rowIndex >= subgridStartRow &&
                rowIndex <= subgridEndRow &&
                colIndex >= subgridStartCol &&
                colIndex <= subgridEndCol)
                ? isCorrectInput
                  ? "highlighted-cell"
                  : "highlighted-cell incorrect-input"
                : ""
            }`}
            onClick={() => onCellSelect(rowIndex, colIndex)}
          >
            {cell || ""}
          </div>
        ))
      )}
    </div>
  );
  */
  // Function to check if a cell is at the edge of a subgrid
  const isSubgridEdge = (index, edgeType) => {
    const edgeChecks = {
      top: index % 3 === 0,
      bottom: (index + 1) % 3 === 0,
      left: index % 3 === 0,
      right: (index + 1) % 3 === 0,
    };
    return edgeChecks[edgeType];
  };

  return (
    <div className="grid">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          // Existing logic for highlighting based on selection and correctness
          /*
          let cellClasses = `cell ${
            (selectedCell.row === rowIndex && selectedCell.col === colIndex) ||
            selectedCell.col === colIndex ||
            selectedCell.row === rowIndex ||
            (rowIndex >= Math.floor(selectedCell.row / 3) * 3 &&
              rowIndex <= Math.floor(selectedCell.row / 3) * 3 + 2 &&
              colIndex >= Math.floor(selectedCell.col / 3) * 3 &&
              colIndex <= Math.floor(selectedCell.col / 3) * 3 + 2)
              ? isCorrectInput
                ? "highlighted-cell"
                : "highlighted-cell incorrect-input"
              : ""
          }`;
          */
          let cellClasses = `cell ${
            selectedCell.row === rowIndex && selectedCell.col === colIndex
              ? isCorrectInput
                ? "highlighted-cell"
                : "highlighted-cell incorrect-input"
              : selectedCell.col === colIndex ||
                selectedCell.row === rowIndex ||
                (rowIndex >= Math.floor(selectedCell.row / 3) * 3 &&
                  rowIndex <= Math.floor(selectedCell.row / 3) * 3 + 2 &&
                  colIndex >= Math.floor(selectedCell.col / 3) * 3 &&
                  colIndex <= Math.floor(selectedCell.col / 3) * 3 + 2)
              ? "related-cell"
              : ""
          }`;

          // Add classes for subgrid borders
          if (isSubgridEdge(rowIndex, "top")) cellClasses += " border-top";
          if (isSubgridEdge(rowIndex, "bottom"))
            cellClasses += " border-bottom";
          if (isSubgridEdge(colIndex, "left")) cellClasses += " border-left";
          if (isSubgridEdge(colIndex, "right")) cellClasses += " border-right";

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={cellClasses}
              onClick={() => onCellSelect(rowIndex, colIndex)}
            >
              {cell || ""}
            </div>
          );
        })
      )}
    </div>
  );
};

export default SudokuGrid;
