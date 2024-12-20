import exerciseDB from '../repository/exercise.db';
import { Exercise } from '../model/exercise';
import { ExerciseInput } from '../types';

const getAllExercises = async (): Promise<Exercise[]> => exerciseDB.getAllExercises();

const getExerciseById = async (id: number): Promise<Exercise> => {
    const exercise = await exerciseDB.getExerciseById({ id });
    if (!exercise) throw new Error(`Exercise with id ${id} does not exist.`);
    return exercise;
};
const createExercise = async ({ name, description, sets, reps, rest, muscleGroup }: ExerciseInput): Promise<Exercise> => {
    if (name === undefined) {
        throw new Error('name is required');
    }
    if (description === undefined) {
        throw new Error('description is required');
    }
    if (sets === undefined) {
        throw new Error('sets is required');
    }
    if (reps === undefined) {
        throw new Error('reps is required');
    }
    if (rest === undefined) {
        throw new Error('rest is required');
    }
    if (muscleGroup === undefined) {
        throw new Error('muscleGroup is required');
    }
    const exercise = new Exercise({
        name,
        description,
        sets,
        reps,
        rest,
        muscleGroup
    });
    await exerciseDB.createExercise(exercise);
    return exercise;
};

const deleteExercise = async (id: number): Promise<Exercise> => {
    const exerciseToDelete = await exerciseDB.getExerciseById({ id });
    if (!exerciseToDelete) {
        throw new Error('Exercise does not exist.');
    }
    const exercise = await exerciseDB.deleteExercise(id);
    return exercise;
}

export default { getAllExercises, getExerciseById, createExercise, deleteExercise };
