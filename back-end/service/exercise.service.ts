import exerciseDB from '../repository/exercise.db';
import { Exercise } from '../model/exercise';

const getAllExercises = async (): Promise<Exercise[]> => exerciseDB.getAllExercises();

const getExerciseById = async (id: number): Promise<Exercise> => {
    const exercise = await exerciseDB.getExerciseById({ id });
    if (!exercise) throw new Error(`Exercise with id ${id} does not exist.`);
    return exercise;
};

export default { getAllExercises, getExerciseById };
