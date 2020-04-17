import React from 'react';

const Result = ({ score, playAgain, curiosity, addItem2, }) => {



    return (
        <div className="score-board">
            <div className="score">{score > 2 ? `Zdobyłeś ${score} / 5 poprawnych odpowiedzi!` : `Zdobyłeś ${score} / 5 poprawnych odpowiedzi!`}</div>
            {score <= 2 && <p className="winP">Tym razem bez nagrody</p>}
            {score > 2 && <button className="win" onClick={addItem2}  >Kliknij po nagrodę</button>}
            {score > 2 && <p className="winP">Otrzymałeś ciekawe miejsce w Toruniu, koniecznie je odwiedz!</p>}
            <button className="playBtn" onClick={playAgain}>Zagraj jeszcze raz!</button>

        </div>
    );
}

export default Result;