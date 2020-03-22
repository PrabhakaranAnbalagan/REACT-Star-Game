import React from 'react';
import './StarMatch.css';
import { colors } from './utils.js';

const PlayNumber = (props) => {
    return (
        <button
            style={{ backgroundColor: colors[props.status] }}
            className="number" onClick={() => props.handleClickEvent(props.number, props.status)}>{props.number}</button>
    );
}
export default PlayNumber;