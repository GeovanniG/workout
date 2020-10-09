import { createSlice, createEntityAdapter, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { exercisesAdapter } from './entityAdapters';

export const fetchExercises = createAsyncThunk('exercises/fetchExercises', async (workoutId) => {
    try {
        const res = await fetch(`http://localhost:8080/users/c46db589-e73c-4b5d-99f4-ebeac4651b52/workouts/${workoutId}/exercises`);
        const {success: exercises, error} = await res.json();
        return { exercises, error };
    } catch (e) {
        return {error: e}
    }
})

const initialState = exercisesAdapter.getInitialState();

export const exercisesSlice = createSlice({
    name: 'exercises',
    initialState,
    reducers: {
        addExercise: (state, { payload: { id='', exercise=''} = {} }) => {
            exercisesAdapter.addOne(state, {id: id || nanoid(), exercise})
        },
        removeExercise: (state, { payload: id='' }) => {
            exercisesAdapter.removeOne(state, id)
        },
        updateExercise: (state, { payload: { id='', exercise='' } }) => {
            exercisesAdapter.updateOne(state, { id, changes: { exercise } })
        }
    },
    extraReducers: {
        [fetchExercises.fulfilled]: (state, { payload: {exercises, error} = {}}) => {
            console.log(exercises, error);
            if (exercises) {
                exercisesAdapter.addMany(state, exercises.map(({exercise_id: id, exercise_name: exercise}) => ({ id, exercise })))
            }
        }
    }
});

export const exercisesArr = state => Object.values(state.exercises.entities);

export const { addExercise, removeExercise, updateExercise, addManyExercises } = exercisesSlice.actions;

export default exercisesSlice.reducer;