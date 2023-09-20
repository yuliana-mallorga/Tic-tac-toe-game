import { useState } from "react";
import "./App.css";

const TURNS = {
  X: "X",
  O: "O",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const classNameSquare = `square ${isSelected ? 'is-selected' : ''}`
  
  const handleClick = () =>{
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} className={classNameSquare}> 
       {children}
    </div>
    )
};

const WINNER_COMBOS = [
  [0, 1, 2], 
  [3, 4, 5], 
  [6, 7, 8], 
  [0, 3, 6], 
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8], 
  [2, 4, 6]
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null) //null es que no hay ganador y false significa empate

  const checkWinner = (boardToCheck) => {
    //revisamos las combinaciones ganadoras
    //para ver cual gano: x un o.
    for (const combo of WINNER_COMBOS){
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]

      ) {
        return boardToCheck[a] // devuelve el ganador
      }
    }
    //si no hay ganador.
    return null
  }

  const updateBoard = (index) => {
    //si ya tiene algo no actualices esta posicion.
    if (board[index] || winner) return
    //actualizar el tablero.
    const newBoard = [... board]
    newBoard[index] = turn
    setBoard(newBoard)
    //cambiar el turno.
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    }else if (checkEndGame(newBoard)){
      setWinner(false) //empate
    }
    console.log(winner, 'el ganador'); //No lo toma?
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }
 
  const checkEndGame = (newBoard) =>{
    return newBoard.every((square) => {square !== null})
  }
  return (
    <>
      <main className="board">
        <h1>Tic tac toe</h1>
        <button onClick={resetGame}>Resetear el juego</button>
        <section className="game">
          {board.map((_, index) => {
            return (
              <Square 
              key={index} 
              index={index}
              updateBoard={updateBoard}
              >
               {board[index]}
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
       {
          winner !== null && (
            <section>
              <div className="winner">
                <h2>
                  { 
                    winner === false
                    ? 'Empate'
                    : 'Gano'
                  }
                </h2>

                <header className="win">
                  { winner && <Square>{winner}</Square>}
                </header>
                <footer>
                  <button onClick={resetGame}>
                    Volver a empezar
                  </button>
                </footer>
              </div>
            </section>
          )
        }
       </section>
      </main>
    </>
  );
}

export default App;
