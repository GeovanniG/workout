-- Database: workout

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- DROP TABLE IF EXISTS exercises;
-- DROP TABLE IF EXISTS workouts;
-- DROP TABLE IF EXISTS users_exercises;

CREATE TABLE IF NOT EXISTS users(
	user_id UUID DEFAULT uuid_generate_v4(),
	username TEXT NOT NULL UNIQUE,
	first_name TEXT,
	last_name TEXT,
	user_password TEXT NOT NULL,
	PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS workouts(
	workout_id INT GENERATED ALWAYS AS IDENTITY,
	workout_name TEXT NOT NULL,
	workout_notes TEXT,
	workout_date DATE NOT NULL,
	workout_type TEXT NOT NULL,
	user_id UUID,
	PRIMARY KEY (workout_id),
	CONSTRAINT users_workout_fk
		FOREIGN KEY (user_id)
		REFERENCES users(user_id)
			ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS exercises(
	exercise_id INT GENERATED ALWAYS AS IDENTITY,
	exercise_name TEXT NOT NULL UNIQUE,
	exercise_type TEXT NOT NULL,
	PRIMARY KEY (exercise_id),
	CONSTRAINT exercise_name_lowercase_ck
  		CHECK (exercise_name = lower(exercise_name))
);

CREATE TABLE IF NOT EXISTS workout_exercises(
	exercise_id INT,
	workout_id INT,
	CONSTRAINT exercises_fk
		FOREIGN KEY (exercise_id)
		REFERENCES exercises(exercise_id)
			ON DELETE CASCADE,
	CONSTRAINT workouts_fk
		FOREIGN KEY (workout_id)
		REFERENCES workouts(workout_id)
			ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS exercise_sets(
	set_id INT GENERATED ALWAYS AS IDENTITY,
	weight REAL NOT NULL,
	reps INT NOT NULL,
	rpe REAL,
	exercise_id INT,
	PRIMARY KEY (set_id),
	CONSTRAINT exercise_fk
		FOREIGN KEY (exercise_id)
		REFERENCES exercises(exercise_id)
			ON DELETE CASCADE
);