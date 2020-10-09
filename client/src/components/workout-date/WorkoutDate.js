// useless delete later
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addWorkout } from '../../slices/workoutsSlice';
import Workout from '../workout/Workout';
import DatePanel from '../date-panel/DatePanel';

const WorkoutDate = () => {
    const dispatch = useDispatch();
    const [date, setDate] = useState(new Date());
    let workoutId;

    const addDay = () => setDate(date => date.addDays(1));
    const subtractDay = () => setDate(date => date.subtractDays(1));

    useEffect(() => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const dateNum = date.getDate();

        (async function () {
            try {
                const res = await fetch(`http://localhost:8080/users/c46db589-e73c-4b5d-99f4-ebeac4651b52/workouts/date/${year}/${month}/${dateNum}`);
                const {success: workouts, error} = await res.json(); 
            
                workouts.forEach(({workout_notes , workout_name, workout_id}) => {
                    workoutId = workout_id
                    dispatch(addWorkout({id: workout_id, workoutName: workout_name, workoutNotes: workout_notes}))
                });     
            } catch (e) {
                console.log(e);
            }
        })()
    }, [date]);


    return (
        <>
            <DatePanel date={date} addDayFcn={addDay} subtractDayFcn={subtractDay} />
            {/* <Workout id={workoutId} /> */}
            {/* <Workout id={4} /> */}
        </>
    )
}

export default WorkoutDate;