import React from 'react';

const Result = ({ score, playAgain, curiosity, addItem2, }) => {

    return (
        <div className="score-board">
            <div className="score">{`Odpowiedziałeś poprawnie na ${score} pytania`}</div>
            {/* {/* <button className="playBtn" onClick={playAgain}>Zagraj jeszcze raz!</button> */}
        </div>
    );
}

export default Result;