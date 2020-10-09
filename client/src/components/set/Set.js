import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSet, removeSet } from '../../slices/setsSlice';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

const Set = ({id, initWeight=0, initReps=0, initRpe=0}) => {
    let [weight, setWeight] = useState(initWeight);
    let [reps, setReps] = useState(initReps);
    let [rpe, setRpe] = useState(initRpe);
    const dispatch = useDispatch();

    const makeRequired = weight || reps;

    const alterSet = (id, value, category, setValueFcn) => {
        if (isNaN(value)) return;
        
        dispatch(updateSet({id, category, value}));
        setValueFcn(value);
    }

    return (
        <div>
            <label htmlFor={`weight${id}`}>Weight: </label>
            <input type='text' id={`weight${id}`} value={weight || ''} 
                onChange={(e) => alterSet(id, e.target.value, 'weight', setWeight)} required={makeRequired} />
            <label htmlFor={`reps${id}`}> Reps: </label>
            <input type='text' id={`reps${id}`} value={reps || ''} 
                onChange={(e) => alterSet(id, e.target.value, 'reps', setReps)} required={makeRequired} />
            <span>@</span>
            <label htmlFor={`rpe${id}`}> RPE: </label>
            <input type='text' id={`rpe${id}`} value={rpe || ''} onChange={(e) => alterSet(id, e.target.value, 'rpe', setRpe)} />
            <button type='button' onClick={() => dispatch(removeSet(id))}>Delete Set</button>
        </div>
    )
}

Set.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    initWeight: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    initReps: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    initRpe: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}

export default Set;