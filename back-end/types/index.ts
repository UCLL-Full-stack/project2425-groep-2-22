type userInput = {
    id?: number;
    username: string;
    password: string;
    workouts: workoutInput[];
}

type workoutInput = {
    id?: number;
    name: string;
    intensity: string;
    type: string;
    duration: number;
    calories: number;
    user: userInput;
    exercises: exerciseInput[];
}

type exerciseInput = {
    id?: number;
    name: string;
    description: string;
    sets: number;
    reps: number;
    rest: number;
    muscleGroup: string;
}
export { userInput, workoutInput, exerciseInput };