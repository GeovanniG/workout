import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setsArr, totalNumOfSets, calculateVolume } from '../../slices/setsSlice';
import { updateWorkout } from '../../slices/workoutsSlice';
import Exercises from '../exercises/Exercises';

const Workout = ({ id, initWorkoutName='', initWorkoutNotes='' }) => {
    const sets = useSelector(setsArr);
    const dispatch = useDispatch();
    const [workoutName, setWorkoutName] = useState(initWorkoutName);
    const [workoutNotes, setWorkoutNotes] = useState(initWorkoutNotes);

    // useEffect(() => {
    //     setTimeout(() => {
    //         if (workouts) {
                
    //         } else {

    //         }
    //     }, 1000*10)
    // }, [])

    return (
        <>
            <label htmlFor='workout-name'>Workout Name</label>
            <input id='workout-name' type='text' onChange={(e) => setWorkoutName(e.target.value)} value={workoutName} />
            <Exercises workoutId={id} />
            <p>Accumalitive sets: {totalNumOfSets(sets)}</p>
            <p>Accumalitive volume: {calculateVolume(sets)}</p>
            <label htmlFor='workout-notes'>Workout Notes</label>
            <textarea id='workout-notes' onChange={(e) => setWorkoutNotes(e.target.value)} value={workoutNotes}>
            </textarea>
        </>
    )
}

export default Workout;