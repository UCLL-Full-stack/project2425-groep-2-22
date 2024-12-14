import workoutDB from '../repository/workout.db';
import { Workout } from '../model/workout';
import { WorkoutInput } from '../types';
import userDB from '../repository/user.db';

const getAllWorkouts = async (): Promise<Workout[]> => workoutDB.getAllWorkouts();

const getWorkoutById = async (id: number): Promise<Workout> => {
    const workout = await workoutDB.getWorkoutById({ id });
    if (!workout) throw new Error(`Workout with id ${id} does not exist.`);
    return workout;
};
const createWorkout = async ({ name, intensity, type, duration, calories, user }: WorkoutInput): Promise<Workout> => {
    if (user.id === undefined) {
        throw new Error('User id is required.');
    }
    const userFromDb = await userDB.getUserById({ id: user.id });
    if (!userFromDb) {
        throw new Error(`User with id ${user.id} not found.`);
    }
    const workoutInput: WorkoutInput = {
        name,
        intensity,
        type,
        duration,
        calories,
        user
    };
    return await workoutDB.createWorkout(workoutInput);
};

export default { getAllWorkouts, getWorkoutById, createWorkout };
