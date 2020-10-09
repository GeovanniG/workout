module.exports = {
    getAllUserExercises: (userId, workoutId) => ({
        text: `SELECT exercises.* FROM users
                INNER JOIN workouts 
                    ON workouts.user_id = users.user_id
                INNER JOIN workout_exercises 
                    ON workout_exercises.workout_id = workouts.workout_id
                INNER JOIN exercises
                    ON exercises.exercise_id = workout_exercises.exercise_id
                WHERE users.user_id = $1
                AND workouts.workout_id = $2`,
        values: [userId, workoutId]
    }),
    // Also include sets
    getUsersExercise: (workoutId, exerciseId) => ({
        text: `SELECT exercises.*, exercise_sets.*, workout_exercises.* FROM exercises
                INNER JOIN workout_exercises 
                    ON workout_exercises.exercise_id = exercises.exercise_id
                INNER JOIN exercise_sets
                    ON exercise_sets.exercise_id = exercises.exercise_id
                WHERE workout_exercises.workout_id = $1
                AND workout_exercises.exercise_id = $2`,

        // text: `SELECT exercises.exercise_name FROM users
        //         INNER JOIN workouts 
        //             ON workouts.user_id = users.user_id
        //         INNER JOIN workout_exercises 
        //             ON workout_exercises.workout_id = workouts.workout_id
        //         INNER JOIN exercises
        //             ON exercises.exercise_id = workout_exercises.exercise_id
        //         WHERE users.user_id = $1 
        //         AND exercises.exercise_id = $2
        //         `,
        values: [workoutId, exerciseId]
    }),
    createUsersExercise: (exerciseId, workoutId) => ({
        text: `INSERT INTO workout_exercises(exercise_id, workout_id)
                VALUES ($1, $2)`,
        // text: `WITH input_rows (exercise_name) AS (VALUES ($1)),
        //         ins AS (
        //             INSERT INTO exercises(exercise_name)
        //             SELECT * FROM input_rows
        //             ON CONFLICT (exercise_name) DO NOTHING
        //             RETURNING exercise_id
        //         ), exercise AS (
        //             SELECT exercise_id FROM ins
        //             UNION ALL
        //             SELECT exercises.exercise_id FROM input_rows
        //                 INNER JOIN exercises USING (exercise_name)
        //         )

        //         INSERT INTO workout_exercises(exercise_id, workout_id)
        //          SELECT exercise_id, $2 
        //          FROM exercise
        // `,
        // text: `WITH exercise AS (
        //             INSERT INTO exercises(exercise_name)
        //             VALUES (LOWER(TRIM($1)))
        //             ON CONFLICT DO NOTHING
        //             RETURNING exercise_id
        //         )

        //         INSERT INTO workout_exercises(exercise_id, workout_id)
        //         SELECT exercise_id, $2 
        //         FROM exercise`,
        values: [exerciseId, workoutId]
    }),
    deleteUsersExercise: (userId, exerciseId) => ({
        text: `DELETE FROM workout_exercises
                exercise_id = $2
        `,
        values: [userId, exerciseId]
    }),
    updateUsersExercise: (workoutId, exerciseId) => ({
        text: `UPDATE workout_exercises 
                SET exercise_id = $1
                WHERE workout_id = $2`,
        values: [exerciseId, workoutId]
    }),
}

// Make a workouts endpoints