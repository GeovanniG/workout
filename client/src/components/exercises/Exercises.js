import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Exercise from '../exercise/Exercise';
import { exercisesArr, addExercise, fetchExercises } from '../../slices/exercisesSlice';

const Exercises = ({ workoutId=-1 }) => {
    const exercises = useSelector(exercisesArr);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchExercises(workoutId))
    }, [workoutId])

    // useEffect(() => {
    //     console.log('ran exercises')
    //     dispatch(addExercise(exercise))
    // }, []);

    return (
        <>
            {exercises.map(({ id, exercise }, index) => <Exercise key={id} id={id} initExercise={exercise} exerciseNum={index+1} workoutId={workoutId} />)}
            <button type='button' onClick={() => dispatch(addExercise())}>Add exercise</button>
        </>
    )
}

export default Exercises;