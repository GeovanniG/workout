module.exports = {
    createExercise: (exerciseName) => ({
        text: `INSERT INTO exercises(exercise_name)
                VALUES ($1)`,
        values: [exerciseName]
    }),
    updateExercise: (exerciseId, { exerciseName }) => ({
        text: `UPDATE exercises
                SET exercise_name = $1
                WHERE exercise_id = $2`,
        values: [exerciseName, exerciseId]
    }),
    getExercise: (exerciseId) => ({
        text: `SELECT exercise_name 
                FROM exercises
                WHERE exercise_id = $1`,
        values: [exerciseId]      
    }),
    getAllExercises: () => ({
        text: `SELECT * FROM exercises`
    }),
    deleteExercise: (exerciseId) => ({
        text: `DELETE FROM exercises
                WHERE exercise_id = $1`,
        values: [exerciseId]
    })
}