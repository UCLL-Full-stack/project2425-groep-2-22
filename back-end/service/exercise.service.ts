import { Exercise } from "../model/exercise";
import exerciseDb from "../repository/exercise.db";

const getAllExercises = async (): Promise<Exercise[]> => {
  return exerciseDb.getAllExercises();
}
export default { getAllExercises };