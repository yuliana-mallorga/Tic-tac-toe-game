import { Square } from "./Square"

export function WinnerModal ({ winner, resetGame }) {
    if (winner === null) return null
    const winnerText = winner === false ? 'Empate' : 'Gano'
    return (  
        <section>
            <div className="winner">
                <h2> {winnerText} </h2>
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

