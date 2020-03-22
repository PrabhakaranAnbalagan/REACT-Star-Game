import { useState, useEffect } from 'react';
import { utils } from './utils.js';

//Custom Hook:

const useGameState = () => {

    const [star, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);
    //const [test, setTest] = useState(0);

    const [secondsLeft, setSecondsLeft] = useState(10);

    useEffect(() => {
        if (secondsLeft > 0 && availableNums.length > 0) {
            const timerId = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000);
            return () => clearTimeout(timerId);
        }
    });

    const setGameState = (newCandidateNums) => {

        if (utils.sum(newCandidateNums) !== star) {
            setCandidateNums(newCandidateNums);
        } else {
            const newAvailableNums = availableNums.filter(
                n => !newCandidateNums.includes(n)
            );
            setStars(utils.randomSumIn(newAvailableNums, 9));
            setAvailableNums(newAvailableNums);
            setCandidateNums([]);
        }
    };

    return { star, availableNums, candidateNums, secondsLeft, setGameState };

}

export default useGameState;