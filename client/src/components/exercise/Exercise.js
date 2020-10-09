import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types'
import { setsArr, volumePerExercise, NumOfSetsPerExcercise, removeExerciseSets } from '../../slices/setsSlice';
import { updateExercise, removeExercise } from '../../slices/exercisesSlice';
import Sets from '../sets/Sets';

const Exercise = ({ id='', initExercise='', exerciseNum=0 , workoutId }) => {
    const [exercise, setExercise] = useState(initExercise);
    const dispatch = useDispatch();
    const sets = useSelector(setsArr);


    const alterExercise = (id, value, setValueFcn) => {
        dispatch(updateExercise({ id, exercise: value }));
        setValueFcn(value);
    }

    const removeExerciseAndSets = id => {
        dispatch(removeExercise(id));
        dispatch(removeExerciseSets(id));
    }

    return (
    <form>
        <fieldset style={{display: 'flex'}}>
            <legend>Exercise {exerciseNum}</legend>

            <label htmlFor={`exercise${id}`}>Exercise: </label>
            <input type='text' id={`exercise${id}`} value={exercise} onChange={(e) => alterExercise(id, e.target.value, setExercise)} />

            <Sets exerciseId={id} workoutId={workoutId} />

            <p>Total sets completed: {NumOfSetsPerExcercise({sets, exerciseId: id})}</p>
            <p>Total Volume: {volumePerExercise({sets, exerciseId: id})}</p>
        </fieldset>
        <button type='button' onClick={() => removeExerciseAndSets(id)}>Delete exercise</button>
    </form>
)};

Exercise.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    initExercise: PropTypes.string,
    exerciseNum: PropTypes.number
}

export default Exercise;