import  {Exercise}  from "./exercise";
import { User } from "./user";
import {Workout as workoutPrisma, Post as postPrisma, User as UserPrisma, Exercise as exercisePrisma} from '@prisma/client';

export class Workout {
    private id?: number;
    private name: string;
    private intensity: string;
    private type: string;
    private duration: number;
    private calories: number;
    private user: User;
    private exercises: Exercise[];

    constructor(workout: {
        id?: number;
        name: string;
        intensity: string;
        type: string;
        duration: number;
        calories: number;
        user: User;
        exercises: Exercise[];
    }) {
        this.validate(workout);
        this.id = workout.id;
        this.name = workout.name;
        this.intensity = workout.intensity;
        this.type = workout.type;
        this.duration = workout.duration;
        this.calories = workout.calories;
        this.user = workout.user;
        this.exercises = workout.exercises;
    }

    getId(): number | undefined {
        return this.id;
    }
    getUser(): User {
        return this.user;
    }
    getExercises(): Exercise[] {
        return this.exercises;
    }

    getName(): string {
        return this.name;
    }
    getIntensity(): string {
        return this.intensity;
    }
    getType(): string {
        return this.type;
    }
    getDuration(): number {
        return this.duration;
    }
    getCalories(): number {
        return this.calories
    }

    validate(workout: {
        name: string;
        intensity: string;
        type: string;
        duration: number;
        calories: number;
        user: User;
        exercises: Exercise[];
    }) {
        if (!workout.name?.trim()) {
            throw new Error('Name is required');
        }
        if (!workout.intensity?.trim()) {
            throw new Error('Intensity is required');
        }
        if (!workout.type?.trim()) {
            throw new Error('Type is required');
        }
        if (!workout.duration) {
            throw new Error('Duration is required');
        }
        if (!workout.calories) {
            throw new Error('Calories is required');
        }
        if (!workout.user) {
            throw new Error('User is required');
        }
        if (!workout.exercises) {
            throw new Error('Exercises are required');
        }
    }

    equals(workout: Workout): boolean {
        return (
            this.name === workout.getName() &&
            this.intensity === workout.getIntensity() &&
            this.type === workout.getType() &&
            this.duration === workout.getDuration() &&
            this.calories === workout.getCalories() &&
            this.user === workout.getUser() &&
            this.exercises === workout.getExercises()
        );
    }
    static from({
        id,
        name,
        intensity,
        type,
        duration,
        calories,
        user,
        exercises
    }: workoutPrisma & { user: UserPrisma; exercises: exercisePrisma[] }): Workout {
        return new Workout({
            id,
            name,
            intensity,
            type,
            duration,
            calories,
            user: User.from(user), 
            exercises: exercises.map((exercise) => Exercise.from(exercise))
        });
    }
}
