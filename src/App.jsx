import { useState } from "react";
import "./App.css";
import { Square } from "./components/Square"
import confetti from "canvas-confetti"
import { TURNS } from "./constants";
import { checkWinnerFrom, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";

function App() {
  const [board, setBoard] = useState(()=>{
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null) 
  })
  const [turn, setTurn] = useState(()=>{
    const turnFromLocalStorage = window.localStorage.getItem('turn')
    return turnFromLocalStorage ?? TURNS.X
  });
  const [winner, setWinner] = useState(null) //null es que no hay ganador y false significa empate

  const updateBoard = (index) => {
    //si ya tiene algo no actualices esta posicion.
    if (board[index] || winner) return;
    //actualizar el tablero.
    const newBoard = [... board]
    newBoard[index] = turn
    setBoard(newBoard)
    //cambiar el turno.
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //guardar la partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    //revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      confetti()
    }else if (checkEndGame(newBoard)){
      setWinner(false) //empate
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }
 
 
  return (
    <>
      <main className="board">
        <h1>Tic tac toe</h1>
        <button onClick={resetGame}>Resetear el juego</button>
        <section className="game">
          {board.map((square, index) => {
            return (
              <Square 
              key={index} 
              index={index}
              updateBoard={updateBoard}
              >
               {square}
              </Square>
            );
          })}
        </section>
        <section className="turn">
          <Square isSelected={turn === TURNS.X}>
            {TURNS.X} 
          </Square>
          <Square isSelected={turn === TURNS.O}>
            {TURNS.O} 
          </Square>
        </section> 
        <section>
          <WinnerModal winner={winner}  resetGame={resetGame}/>
        </section>
      </main>
    </>
  );
}

export default App;
