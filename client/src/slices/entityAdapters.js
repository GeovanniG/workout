import { createEntityAdapter } from '@reduxjs/toolkit';

// {
    // ids: []
    // entities: {
            // id#: {
                // id: ''
                // workoutName: '' 
                // workoutNotes: '' 
            // }
    // } 
// }
export const workoutsAdapter = createEntityAdapter();

// {
    // ids: []
    // entities: {
            // id#: {
                // id: ''
                // exercise: '' 
            // }
    // } 
// }
export const exercisesAdapter = createEntityAdapter();

// {
    // ids: []
    // entities: {
            // id#: {
                // id: ''
                // weight: ''
                // reps: ''
                // rpe: ''
                // exerciseId: ''
            // }
    // } 
// }
export const setsAdapter = createEntityAdapter();