import { User } from "../model/user";
import { Workout } from "../model/workout";
import workoutDb from "../repository/workout.db";

const getAllWorkouts = async (): Promise<Workout[]> => {
  return workoutDb.getAllWorkouts();
}
export default { getAllWorkouts };