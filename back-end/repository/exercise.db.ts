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

const createExercise = async (group: Exercise): Promise<Exercise> => {
    try {
        const exercisePrisma = await database.exercise.create({
            data: {
                name: group.getName(),
                description: group.getDescription(),
                sets: group.getSets(),
                reps: group.getReps(),
                rest: group.getRest(),
                muscleGroup: group.getMuscleGroup()
            },
        });

        return Exercise.from(exercisePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
const deleteExercise = async (id: number): Promise<Exercise> => {
    const deletedExercise = await database.exercise.delete({
        where: { id }
    });
    return Exercise.from(deletedExercise);
};

export default {
    getAllExercises,
    getExerciseById,
    createExercise,
    deleteExercise
};
