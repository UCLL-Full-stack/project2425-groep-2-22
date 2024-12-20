import workoutDB from '../repository/workout.db';
import { Workout } from '../model/workout';
import { Role, WorkoutInput } from '../types';
import exerciseDB from '../repository/exercise.db';
import { ExerciseInput } from '../types';
import userDB from '../repository/user.db';
import { UnauthorizedError } from 'express-jwt';

const getWorkouts = async ({ username, role }: { username: string, role:Role }): Promise<Workout[]> => {
    if(role === 'admin'){
        return workoutDB.getAllWorkouts();
    }else if(role === 'member' || role === 'trainer'){
        return workoutDB.getWorkoutsForUser({ username });
    }
    throw new UnauthorizedError('credentials_required', { message: 'You are not authorized to view this information' });
};

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
const addExerciseToWorkout = async (workoutId: number, exerciseId: number): Promise<Workout | null> => {
    const workout = await workoutDB.getWorkoutById({ id: workoutId });
    if (!workout) {
        throw new Error('Workout not found.');
    }
    const exercise = await exerciseDB.getExerciseById({ id: exerciseId });
    if (!exercise) {
        throw new Error('Exercise not found.');
    }
    await workoutDB.addExercise(workoutId, exerciseId);
    return workoutDB.getWorkoutById({ id: workoutId });
};
const deleteWorkout = async (id: number): Promise<Workout> => {
    const workoutToDelete = await workoutDB.getWorkoutById({ id });
    if (!workoutToDelete) {
        throw new Error('Exercise does not exist.');
    }
    const workout = await workoutDB.deleteWorkout(id);
    return workout;
}


export default { getAllWorkouts, getWorkoutById, createWorkout, addExerciseToWorkout, deleteWorkout , getWorkouts };
