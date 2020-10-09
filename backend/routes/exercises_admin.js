const express = require('express');
const router = express.Router({ mergeParams:true });
const { query } = require('../db/index');
const { createExercise, getAllExercises, getExercise, updateExercise, deleteExercise } = require('../db/exercises_admin');

router.post('/', async (req, res, next) => {
    const { exerciseName } = req.body;
    try {
        await query(createExercise(exerciseName));
        res.send('Exercise created');
    } catch (e) {
        res.send(e+'Unable to create exercise');
    }
})

router.get('/', async (req, res, next) => {
    try {
        const exercises = await query(getAllExercises());
        res.send(exercises);
    } catch (e) {
        res.send('Unable to get all exercises');
    }
})

router.get('/:exerciseId', async (req, res, next) => {
    const exerciseId = req.params['exerciseId'];
    try {
        const exercise = await query(getExercise(exerciseId));
        res.send(exercise);
    } catch (e) {
        res.send('Unable to get exercise');
    }
})

router.put('/:exerciseId', async (req, res, next) => {
    const exerciseId = req.params['exerciseId'];
    const { exerciseName } = req.body;
    try {
        await query(updateExercise(exerciseId, { exerciseName }));
        res.send('Updated exercise successfully');
    } catch (e) {
        res.send('Unable to update exercise');
    }
})

router.delete('/:exerciseId', async (req, res, next) => {
    const exerciseId = req.params['exerciseId'];
    try {
        await query(deleteExercise(exerciseId));
        res.send('Deleted exercise successfully');
    } catch (e) {
        res.send('Unable to delete exercise');
    }
})

module.exports = router;