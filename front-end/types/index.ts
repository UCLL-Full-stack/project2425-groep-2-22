export type Workout = {
    id?: number;
    name: string;
    intensity: string;
    type: string;
    duration: number;
    calories: number;
    user: User;
    exercises: Exercise[];
}
export type User = {
    id?: number;
    username: string;
    password: string;
    workouts: Workout[];
}
export type Exercise = {
    id?: number;
    name: string;
    description: string;
    sets: number;
    reps: number;
    rest: number;
    muscleGroup: string;
}
