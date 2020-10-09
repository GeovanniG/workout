import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addWorkout, removeWorkout, fetchWorkouts } from '../../slices/workoutsSlice';

const DatePanel = () => {
    const dispatch = useDispatch();
    const [date, setDate] = useState(new Date());

    const addDay = () => setDate(date => date.addDays(1));
    const subtractDay = () => setDate(date => date.subtractDays(1));

    useEffect(() => {
        dispatch(fetchWorkouts(date))
    }, [date]);

    return (
        <>
            <div style={{display:'flex', justifyContent: 'space-between'}}>  
                <div onClick={subtractDay}>{'<'}</div>
                {date ? date.toDateString() : localDate.toDateString()}
                <div onClick={addDay}>{'>'}</div>
            </div>
        </>
    )
}

export default DatePanel;