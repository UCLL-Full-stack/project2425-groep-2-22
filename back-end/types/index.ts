type UserInput = {
    id?: number;
    username: string;
    password: string;
    workouts?: WorkoutInput[];
    posts?: PostInput[];
};

type WorkoutInput = {
    id?: number;
    name: string;
    intensity: string;
    type: string;
    duration: number;
    calories: number;
    user: UserInput;
    exercises?: ExerciseInput[];
};

type ExerciseInput = {
    id?: number;
    name: string;
    description: string;
    sets: number;
    reps: number;
    rest: number;
    muscleGroup: string;
};

type PostInput = {
    id?: number;
    title: string;
    description: string;
    rating: number;
    user: UserInput;
    createdAt?: Date;
};

export { UserInput, WorkoutInput, ExerciseInput, PostInput };
