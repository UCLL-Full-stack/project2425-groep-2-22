import { Workout } from '../model/workout';
import { User } from '../model/user';
import { Exercise } from '../model/exercise';
const workouts = [
    new Workout({ 
        id: 1,
        name: 'Hardlopen',
        intensity: 'Hoog', 
        type: 'Cardio', 
        duration: 30, 
        calories: 200, 
        user: new User({ id: 3, username: 'user3', password: 'Wachtwoorduser3', workouts: [] }), 
        exercises: [] }),
]
const getAllWorkouts  = async (): Promise<Workout[]> => {
    return workouts;
}
const createWorkout = ({ name, intensity, type, duration, calories, user, exercises }: { name: string, intensity: string, type: string, duration: number, calories: number, user: User, exercises: Exercise[] }): Workout => {
    const workout = new Workout({ name, intensity, type, duration, calories, user, exercises });
    workouts.push(workout);
    return workout;
}
const getWorkoutById = ({ id }: { id: number }): Workout | null => {
    try {
        return workouts.find((workout) => workout.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const addExerciseToWorkout = async (workout: Workout, exercise: Exercise): Promise<Workout> => {
    workout.getExercises().push(exercise);
    return workout;
}
export default { getAllWorkouts, createWorkout, getWorkoutById, addExerciseToWorkout};