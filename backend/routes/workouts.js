const express = require('express');
const router = express.Router({ mergeParams: true });
const { getAllUserWorkouts, getUsersWorkout, createUsersWorkout, deleteUsersWorkout, updateUsersWorkout, getUsersWorkoutByDate } = require('../db/workouts');
const { query } = require('../db/index');

router.get('/', async (req, res, next) => {
    try {
        const userId = req.params['userId'];
        const workouts = await query(getAllUserWorkouts(userId));
        res.json({success: workouts});
    } catch (e) {
        console.log(e)
        res.json({error: e +". Could not retrieve user's workouts"})
    }
})

router.post('/', async (req, res, next) => {
    const { workoutName, workoutNotes } = req.body;
    try {
        const userId = req.params['userId'];
        const workout = await query(createUsersWorkout(userId, workoutName, workoutNotes));
        res.json({success: workout});
    } catch (e) {
        res.json({error: e + ' Unable to create workout'});
    }
})

router.get('/:workoutId', async (req, res, next) => {
    try {
        const userId = req.params['userId'];
        const workoutId = req.params['workoutId'];
        const workout = await query(getUsersWorkout(userId, workoutId));
        res.json({success: workout});
    } catch (e) {
        res.json({error: e + ' Could not retrieve user workout'});
    }
})

router.put('/:workoutId', async (req, res, next) => {
    const { workoutName, workoutNotes } = req.body;
    try {
        const userId = req.params['userId'];
        const workoutId = req.params['workoutId'];
        const updatedWorkout = await query(updateUsersWorkout(userId, workoutId, workoutName, workoutNotes));
        res.json({success: updatedWorkout});
    } catch (e) {
        res.json({error: e + " Could not update user's workout"});
    }
})

router.delete('/:workoutId', async (req, res, next) => {
    try {
        const userId = req.params['userId'];
        const workoutId = req.params['workoutId'];
        const workout = await query(deleteUsersWorkout(userId, workoutId));
        res.json({success: 'Workout successfully deleted'});
    } catch (e) {
        res.json({error: 'Could not retrieve user workout'});
    }
})


router.get('/date/:year/:monthIndex/:dateNum', async (req, res, next) => {
    try {
        const userId = req.params['userId'];
        const year = req.params['year'];
        const month = req.params['monthIndex'];
        const dateNum = req.params['dateNum'];
        const date = new Date(year, month, dateNum);
        const workout = await query(getUsersWorkoutByDate(userId, date));
        res.json({success: workout});
    } catch (e) {
        res.send({error: "Cannot get user's workout by date"})
    }
})

module.exports = router;