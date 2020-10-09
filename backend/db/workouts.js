module.exports = {
    getAllUserWorkouts: (userId) => ({
        text: `SELECT workouts.* FROM users
                INNER JOIN workouts 
                    ON workouts.user_id = users.user_id
                WHERE users.user_id = $1
                `,
        values: [userId]
    }),
    // aslo include exercises and sets
    getUsersWorkout: (userId, workoutId) => ({
        text: `SELECT workouts.* FROM users
                INNER JOIN workouts 
                    ON workouts.user_id = users.user_id
                WHERE users.user_id = $1 
                AND workouts.workout_id = $2
                `,
        values: [userId, workoutId]
    }),
    createUsersWorkout: (userId, workoutName, workoutNotes, workoutDate=new Date()) => ({
        text: `INSERT INTO workouts(user_id, workout_name, workout_notes, workout_date)
                VALUES ($1, $2, $3, $4)
                RETURNING *
                `,
        values: [userId, workoutName, workoutNotes, workoutDate]
    }),
    deleteUsersWorkout: (userId, workoutId) => ({
        text: `DELETE FROM workouts
                WHERE workouts.user_id = $1
                AND workouts.workout_id = $2
        `,
        values: [userId, workoutId]
    }),
    // userId not necessary
    updateUsersWorkout: (userId, workoutId, workoutName, workoutNotes) => ({
        text:`UPDATE workouts 
                SET workout_name = COALESCE($1, workout_name),
                    workout_notes = COALESCE($2, workout_notes)
                WHERE user_id = $3
                AND workout_id = $4
                RETURNING *
                `,
        values: [workoutName, workoutNotes, userId, workoutId]
    }),
    getUsersWorkoutByDate: (userId, workoutDate) => ({
        text: `SELECT * FROM workouts
                WHERE user_id = $1
                AND workout_date = $2`,
        values: [userId, workoutDate]
    })
}

// Make a workouts endpoints