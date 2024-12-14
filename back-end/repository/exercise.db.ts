import { Exercise } from '../model/exercise';
import database from '../util/database';
import { Exercise as ExercisePrisma } from '@prisma/client';

const getAllExercises = async (): Promise<Exercise[]> => {
    try {
        const exercisesPrisma = await database.exercise.findMany();
        return exercisesPrisma.map((exercisePrisma) => Exercise.from(exercisePrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getExerciseById = async ({ id }: { id: number }): Promise<Exercise | null> => {
    try {
        const exercisePrisma = await database.exercise.findUnique({
            where: { id }
        });
        return exercisePrisma ? Exercise.from(exercisePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createExercise = async (exerciseData: {
    name: string;
    description: string;
    sets: number;
    reps: number;
    rest: number;
    muscleGroup: string;
}): Promise<Exercise> => {
    try {
        const newExercisePrisma = await database.exercise.create({
            data: exerciseData
        });
        return Exercise.from(newExercisePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllExercises,
    getExerciseById,
    createExercise
};
