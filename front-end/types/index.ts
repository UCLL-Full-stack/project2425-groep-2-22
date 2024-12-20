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
export type UserProfile = {
    id?: number;
    username: string;
    password: string;
    role?: string;
    firstName?: string;
    lastName?: string;
    age: number;
    gender: string;
    height: number;
    weight: number;
    workouts?: Workout[];
};
export type User = {
    id?: number;
    username: string;
    password: string;
    role?: string;
    workouts?: Workout[];
};
export type Exercise = {
    id?: number;
    name: string;
    description: string;
    sets: number;
    reps: number;
    rest: number;
    muscleGroup: string;
}
export type Post = {
    id?: number;
    title: string;
    description: string;
    rating: number;
    user: User;
    createdAt: Date;
}
export type StatusMessage = {
    message: string;
    type: "error" | "success";
};
