const express = require('express');
const router = express.Router({ mergeParams: true });
const { query } = require('../db/index');
const { getExerciseSet, createExerciseSet, updateExerciseSet, deleteExerciseSet, getAllExerciseSets } = require('../db/sets');

router.get('/:setId', async (req, res, next) => {
    try {
        const setId = req.params['setId'];
        const set = await query(getExerciseSet(setId));
        res.json({success: set})
    } catch (e) {
        res.json({error: e + " Unable to get user's set"})
    }
})

router.get('/', async (req, res, next) => {
    try {
        const workoutId = req.params['workoutId'];
        const exerciseId = req.params['exerciseId'];
        const set = await query(getAllExerciseSets(workoutId, exerciseId));
        res.json({success: set})
    } catch (e) {
        res.json({error: e+"Unable to get exerise's set for workout"})
    }
})

router.post('/', async (req, res, next) => {
    const exerciseId = req.params['exerciseId'];
    const { weight, reps, rpe=null } = req.body;
    try {
        await query(createExerciseSet(exerciseId, { weight, reps, rpe }));
        res.json({success: 'Set successfully created'});
    } catch (e) {
        res.json({error: e+"Unable to create set"});
    }
})

router.put('/:setId', async (req, res, next) => {
    const setId = req.params['setId'];
    const { weight, reps, rpe=null } = req.body;
    try {
        await query(updateExerciseSet(setId, { weight, reps, rpe }));
        res.json({success: 'Set updated successfully'});
    } catch (e) {
        res.json({error: "Unable to update set"});
    }
})

router.delete('/:setId', async (req, res, next) => {
    const setId = req.params['setId'];
    try {
        await query(deleteExerciseSet(setId));
        res.json({success: 'Set deleted successfully'});
    } catch (e) {
        res.json({error: "Unable to delete set"});
    }
})

module.exports = router;