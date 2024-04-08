import Navbar from "./(components)/Navbar";
import SudokuGrid from "./(components)/SudokuGrid";
import NumberPad from "./(components)/NumberPad";
import GameBoard from "./(components)/GameBoard";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 bg-gray-100  min-h-screen ">
      <Navbar />
      <div className="flex justify-center items-center">
        <GameBoard />
      </div>
    </div>
  );
}
