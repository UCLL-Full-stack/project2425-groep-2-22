import { Workout } from '../model/workout';
import { User } from '../model/user';
import { Exercise } from '../model/exercise';
import database from '../util/database';
import { WorkoutInput } from '../types';
import { Workout as WorkoutPrisma, User as UserPrisma, Exercise as ExercisePrisma } from '@prisma/client';
import { create } from 'domain';

const getAllWorkouts = async (): Promise<Workout[]> => {
    try {
        const workoutsPrisma = await database.workout.findMany({
            include: {
                user: true,
                exercises: true
            }
        });
        return workoutsPrisma.map((workoutPrisma) => Workout.from(workoutPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getWorkoutById = async ({ id }: { id: number }): Promise<Workout | null> => {
    try {
        const workoutPrisma = await database.workout.findUnique({
            where: { id },
            include: {
                user: true,
                exercises: true
            }
        });
        return workoutPrisma ? Workout.from(workoutPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
const createWorkout = async ({ name, intensity, type, duration, calories, user }: WorkoutInput): Promise<Workout> => {
    try {
        const workoutPrisma = await database.workout.create({
            data: {
                name,
                intensity,
                type,
                duration,
                calories,
                user: {
                    connect: { id: user.id }
                }
            },
            include: {
                user: true,
                exercises: true,
            },
        });
        return Workout.from(workoutPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


export default {
    getAllWorkouts,
    getWorkoutById,
    createWorkout
};
