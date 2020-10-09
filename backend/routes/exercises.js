const express = require('express');
const router = express.Router({ mergeParams: true });
const { getAllUserExercises, getUsersExercise, createUsersExercise, deleteUsersExercise, updateUsersExercise } = require('../db/exercises');
const { query } = require('../db/index');

router.get('/', async (req, res, next) => {
    try {
        const userId = req.params['userId'];
        const workoutId = req.params['workoutId'];
        const exercises = await query(getAllUserExercises(userId, workoutId));
        return res.json({success: exercises});
    } catch (e) {
        return res.json({error: e + ' Not able to return exercises.'})
    }
})

router.get('/:exerciseId', async (req, res, next) => {
    const workoutId = req.params['workoutId'];
    const exerciseId = req.params['exerciseId'];
    try {
        const exercises = await query(getUsersExercise(workoutId, exerciseId));
        return res.json({success: exercises});
    } catch (e) {
        return res.json({error: e + ' Could not retrieve exercise for user'});
    }
})

router.post('/:exerciseId', async (req, res, next) => {
    try {
        const workoutId = req.params['workoutId'];
        const exerciseId = req.params['exerciseId']
        await query(createUsersExercise(exerciseId, workoutId));
        res.json({error: "Exercise successfully created"});
    } catch (e) {
        res.json({error: e + " Cannot create user's exercise"});
    }
})

router.put('/:exerciseId', async (req, res, next) => {
    const exerciseId = req.params['exerciseId'];
    const userId = req.params['userId'];
    const workoutId = req.params['workoutId'];
    try {
        await query(updateUsersExercise(userId, workoutId, exerciseId))
        res.json({error: 'Exercise updated successfully'});
    } catch (e) {
        res.json({error: e + " Unable to update user's exercise"});
    }
})

router.delete('/:exerciseId', async (req, res, next) => {
    const exerciseId = req.params['exerciseId'];
    try {
        await query(deleteUsersExercise(exerciseId));
        res.json({success: "Exercise deleted successfully"});
    } catch (e) {
        res.json({error: e + " Cannot delete user's exercise"})
    }
})

module.exports = router;