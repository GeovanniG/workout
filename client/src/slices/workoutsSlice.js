import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { workoutsAdapter } from './entityAdapters';

export const fetchWorkouts = createAsyncThunk('workouts/fetchWorkouts', async (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const dateNum = date.getDate();

    try {
        const res = await fetch(`http://localhost:8080/users/c46db589-e73c-4b5d-99f4-ebeac4651b52/workouts/date/${year}/${month}/${dateNum}`);
        const {success: workouts, error} = await res.json(); 
        return { workouts, error };
    } catch (e) {
        return { error: e };
    }
})

const initialState = workoutsAdapter.getInitialState();

export const workoutsSlice = createSlice({
    name: 'workouts',
    initialState,
    reducers: {
        // consider adding a workout type to workouts
        // Notice that supersets can now be utilized via another workout using the same date
        addWorkout: (state, {payload: {id='', workoutName='', workoutNotes=''}={}}) => {
            workoutsAdapter.addOne(state, {id: id || nanoid(), workoutName, workoutNotes})
        },
        removeWorkout: (state, { payload: id='' }) => {
            workoutsAdapter.removeOne(state, id)
        },
        updateWorkout: (state, {payload: {id='', workoutName=null, workoutNotes=null}={}}) => {
            workoutsAdapter.updateOne(state, {id, changes: { workoutName, workoutNotes }})
        }
    },
    extraReducers: {
        [fetchWorkouts.fulfilled]: (state, {payload: { workouts, error } = {}}) => {
            workoutsAdapter.addMany(state, 
                workouts.map(
                    ({workout_id: id, workout_name: workoutName, workout_notes: workoutNotes}) => ({id, workoutName, workoutNotes})
                )
            )             
        }
    }
})

export const workoutsArr = state => Object.values(state.workouts.entities);

export const { setWorkoutNotes, setWorkoutName, addWorkout, removeWorkout, updateWorkout } = workoutsSlice.actions;

export default workoutsSlice.reducer;