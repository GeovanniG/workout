import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { setsArr, addSet, fetchSets } from '../../slices/setsSlice';
import Set from '../set/Set';

const Sets = ({ workoutId, exerciseId }) => {
    const sets = useSelector(setsArr);
    const dispatch = useDispatch();

    const setsPerExercise = sets.filter(set => set.exerciseId == exerciseId);

    useEffect(() => {
        dispatch(fetchSets({workoutId, exerciseId}))
    }, [workoutId, exerciseId])

    // useEffect(() => {
    //     dispatch(addSet({ exerciseId }))
    // }, [])

    return (
        <>
            {setsPerExercise.map(({id, weight, reps, rpe}) => <Set key={id} id={id} initWeight={weight} initReps={reps} initRpe={rpe} />)}
            <button type='button' onClick={() => dispatch(addSet({ exerciseId }))}>Add a set</button>
        </>
    )
}

Sets.propTypes = {
    exerciseId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired
}

export default Sets;