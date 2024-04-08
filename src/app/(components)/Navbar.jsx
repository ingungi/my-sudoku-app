import React from "react";

const Navbar = () => {
  return (
    <nav className="shadow-sm sticky top-0 left-0 bg-white">
      <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-gray-500 text-3xl">Sudoku</h2>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
