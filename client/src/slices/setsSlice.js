import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { setsAdapter } from './entityAdapters'

export const fetchSets = createAsyncThunk('sets/fetchSets', async ({workoutId=-1, exerciseId=-1}={}) => {
    try {
        const res = await fetch(`http://localhost:8080/users/c46db589-e73c-4b5d-99f4-ebeac4651b52/workouts/${workoutId}/exercises/${exerciseId}/sets`);
        const {success: sets, error} = await res.json();
        return { sets, error };
    } catch (e) {
        return {error: e}
    }
})

const initialState = setsAdapter.getInitialState();

export const setsSlice = createSlice({
    name: 'sets',
    initialState,
    reducers: {
        addSet: (state, {payload: {id='', weight='', reps='', rpe='', exerciseId=''}={}}) => {
            setsAdapter.addOne(state, {id: id || nanoid(), weight, reps, rpe, exerciseId})
        },
        removeSet: (state, {payload: id=''}) => {
            setsAdapter.removeOne(state, id)
        },
        removeExerciseSets: (state, {payload: exerciseId=' '}) => {
            const sets = Object.values(state.entities);
            const exerciseSets = setsBelongingToExercise({sets, exerciseId});
            const exerciseSetsIds = exerciseSets.map(set => set.id);
            setsAdapter.removeMany(state, exerciseSetsIds);
        },
        updateSet: (state, {payload: {id='', category='', value=''}={}}) => {
            // Throw error if missing parameter
            // Throw error if value is NaN
            // value = Number(value);
            setsAdapter.updateOne(state, { id, changes: { [category]: value } })
        }
    },
    extraReducers: {
        [fetchSets.fulfilled]: (state, {payload: {sets, error}={}}) => {
            if (sets) {
                setsAdapter.addMany(state, sets.map(({set_id: id, exercise_id: exerciseId, ...rest}) =>  ({id, exerciseId, ...rest})))
            }
        }
    }
});

export const calculateVolume = sets => sets.reduce((total, { weight, reps }) => total + weight*reps, 0);

export const setsBelongingToExercise = ({ sets, exerciseId }) => sets.filter(set => set.exerciseId === exerciseId);

export const volumePerExercise = ({ sets, exerciseId }) => {
    const exerciseSets = setsBelongingToExercise({ sets, exerciseId })
    return calculateVolume(exerciseSets);
}

export const totalNumOfSets = sets => sets.length;

export const NumOfSetsPerExcercise = ({ sets, exerciseId }) => (
    setsBelongingToExercise({ sets, exerciseId }).length
)

export const setsArr = storeState => Object.values(storeState.sets.entities);

export const { addSet, removeSet, updateSet, removeExerciseSets, addManySets } = setsSlice.actions;

export default setsSlice.reducer;