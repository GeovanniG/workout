module.exports = {
    createExerciseSet: (exerciseId, {weight, reps, rpe=null}={}) => ({
        text: `INSERT INTO exercise_sets(exercise_id, weight, reps, rpe)
                VALUES ($1, $2, $3, $4)
        `,
        values: [exerciseId, weight, reps, rpe]
    }),
    updateExerciseSet: (setId, {weight, reps, rpe=null}={}) => ({
        text: `UPDATE exercise_sets
                SET weight=$1, 
                    reps=$2, 
                    rpe=$3
                WHERE set_id=$4
        `,
        values: [weight, reps, rpe, setId]
    }),
    deleteExerciseSet: (setId) => ({
        text: `DELETE FROM exercise_sets
                WHERE set_id = $1`,
        values: [setId]
    }),
    getExerciseSet: (setId) => ({
        text: `SELECT * FROM exercise_sets
                WHERE set_id = $1
        `,
        values: [setId]
    }),
    getAllExerciseSets: (workoutId, exerciseId) => ({
        text: `SELECT exercise_sets.* FROM exercise_sets
                INNER JOIN workout_exercises
                ON workout_exercises.exercise_id = exercise_sets.exercise_id
                WHERE workout_id = $1
                AND exercise_sets.exercise_id = $2`,
        values: [workoutId, exerciseId]
    })
}