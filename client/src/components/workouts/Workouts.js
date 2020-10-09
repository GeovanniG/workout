import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Workout from '../workout/Workout';
import { workoutsArr, addWorkout } from '../../slices/workoutsSlice';

const Workouts = () => {
    const workouts = useSelector(workoutsArr);
    const dispatch = useDispatch();
    
    return (
        <>
            {workouts.map(({id, workoutName, workoutNotes}) => <Workout id={id} key={id} initWorkoutName={workoutName} initWorkoutNotes={workoutNotes} />)}
            <button type='button' onClick={() => dispatch(addWorkout())}>Add Workout</button>
            <button>Resistance Training</button>
            <button>Cardio</button>
        </>
    )
}

export default Workouts;