import setsReducer from './setsSlice';
import exercisesReducer from './exercisesSlice';
import workoutsReducer from './workoutsSlice';

export const reducer = {
    sets: setsReducer,
    exercises: exercisesReducer,
    workouts: workoutsReducer
}