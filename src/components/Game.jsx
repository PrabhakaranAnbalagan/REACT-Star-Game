import React from 'react';
import './StarMatch.css';
import { utils } from './utils.js';
import PlayNumber from './PlayNumber';
import StarDisplay from './StarDisplay';
import PlayAgain from './PlayAgain';
import useGameState from './useGameState';

const Game = (props) => {
    const {
        star,
        availableNums,
        candidateNums,
        secondsLeft,
        setGameState,
    } = useGameState();

    const candidatesAreWrong = utils.sum(candidateNums) > star;

    const gameStatus = availableNums.length === 0
        ? 'won'
        : secondsLeft === 0 ? 'lost' : 'active'

    const handleClick = (number, currentStatus) => {
        if (gameStatus !== 'active' || currentStatus === 'used') {
            return;
        }

        const newCandidateNums =
            currentStatus === 'available'
                ? candidateNums.concat(number)
                : candidateNums.filter(cn => cn !== number);

        setGameState(newCandidateNums);
    };

    const numberStatus = (number) => {
        if (!availableNums.includes(number)) {
            return 'used';
        }
        if (candidateNums.includes(number)) {
            return candidatesAreWrong ? 'wrong' : 'candidate';
        }
        return 'available';
    };
    return (
        <div className="game">
            {/* <p>You clicked {test} times</p> */}
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
        </div>
            <div className="body">
                <div className="left">
                    {gameStatus !== 'active' ? (
                        <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
                    ) : (
                            <StarDisplay star={star} />
                        )}
                </div>
                <div className="right">
                    {utils.range(1, 9).map(id => <PlayNumber key={id} status={numberStatus(id)} handleClickEvent={handleClick} number={id} />)}
                </div>
            </div>
            <div className="timer">Time Remaining: {secondsLeft}</div>
        </div>
    );
};

export default Game;



