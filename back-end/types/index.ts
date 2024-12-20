type UserInput = {
    id?: number;
    firstName: string;
    lastName: string;
    age: number;
    weight: number;
    height: number;
    gender:string;
    username: string;
    password: string;
    role: Role;
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
type AuthenticationResponse = {
    id: number;
    token: string;
    username: string;
    role: string;
    firstName: string;
    lastName: string;
    age: number;
    weight: number;
    height: number;
    gender: string;
};

type Role = 'admin' | 'trainer' | 'member' | 'guest';


export { UserInput, WorkoutInput, ExerciseInput, PostInput, AuthenticationResponse, Role };
