import React from 'react';
import './StarMatch.css';
import { utils } from './utils.js';

const StarDisplay = props => (

    <>
        {utils.range(1, props.star).map(id => <div key={id} className="star" />)}
    </>

);

export default StarDisplay;