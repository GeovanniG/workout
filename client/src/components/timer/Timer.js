import React, { useState, useEffect } from 'react';

const Timer = () => {
    const [seconds, setSeconds] = useState(90);
    const [userMins, setUserMins] = useState(1);
    const [userSecs, setUserSecs] = useState(30);
    const [start, setStart] = useState(false);

    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;

    useEffect(() => {
        let interval;

        if (start) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    clearInterval()
                } else {
                    setSeconds(seconds => seconds - 1);
                }
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [seconds, start]);

    const setOnlyNums = (numStr, setValueFcn) => {
        if (isNaN(numStr)) return;

        const num = Number(numStr);      
        
        if (num >= 60) return;

        setValueFcn(num);
    }

    const reset = () => {
        setSeconds(totalUserSecs);
        setStart(false);
    }

    const totalUserSecs = userMins*60 + userSecs;

    return (
        <div>
            Rest period
            {`${minutes}`.padStart(2, '0')}:{`${secondsLeft}`.padStart(2, '0')}

            <button type='button' onClick={() => setSeconds(totalUserSecs)}>Set To</button>
            <label htmlFor={`minutes`}>Minutes: </label>
            <input type='text' id={`minutes`} value={userMins}  onChange={(e) => setOnlyNums(e.target.value, setUserMins)} />
            <label htmlFor={`seconds`}>Seconds: </label>
            <input type='text' id={`seconds`} value={userSecs}  onChange={(e) => setOnlyNums(e.target.value, setUserSecs)} />
            
            <button type='button' onClick={reset}>Reset</button>
            <button type='button' onClick={() => setStart(!start)}>{start ? 'Stop' : 'Start'}</button>
        </div>
    )
}

export default Timer;