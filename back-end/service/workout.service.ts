import { User } from "../model/user";
import { Workout } from "../model/workout";
import workoutDb from "../repository/workout.db";
import userDb from "../repository/user.db";
import { workoutInput, exerciseInput } from "../types"; // Ensure you import exerciseInput
import { Exercise } from "../model/exercise";
import exerciseDb from "../repository/exercise.db";

const getAllWorkouts = async (): Promise<Workout[]> => {
  return workoutDb.getAllWorkouts();
};

const createWorkout = async ({
    name,
    intensity,
    type,
    duration,
    calories,
    user: userInput,
    exercises: exerciseInput}: workoutInput): Promise<Workout> => {
    if (userInput.id === undefined) {
        throw new Error("User ID is undefined");
    }
    
    const isUser = await userDb.getUserById({ id: userInput.id });
    if (!isUser) {
        throw new Error("User does not exist");
    }
    const exercises = exerciseInput.map(exercise => {
        return new Exercise(exercise); 
    });
    const workout = workoutDb.createWorkout({
        name,
        intensity,
        type,
        duration,
        calories,
        user: isUser,
        exercises});
    return workout;
};

const addExerciseToWorkout = async (workoutId: number, exerciseId: number): Promise<Workout> => {
    const workout = await workoutDb.getWorkoutById({ id: workoutId });
    if (!workout) {
        throw new Error("Workout does not exist");
    }
    const exercise = await exerciseDb.getExerciseById({ id: exerciseId });
    if (!exercise) {
        throw new Error("Exercise does not exist");
    }
    await workoutDb.addExerciseToWorkout(workout, exercise);
    return workout;
}

export default { getAllWorkouts, createWorkout, addExerciseToWorkout};
