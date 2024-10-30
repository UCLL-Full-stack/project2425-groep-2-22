import { User } from "./user";

export class Workout {
    private id?: number;
    private name: string;
    private intensity: string;
    private type: string;
    private duration: number;
    private calories: number;
    private user: User;

    constructor(workout: {
        id?: number;
        name: string;
        intensity: string;
        type: string;
        duration: number;
        calories: number;
        user: User;
    }) {
        this.validate(workout);
        this.id = workout.id;
        this.name = workout.name;
        this.intensity = workout.intensity;
        this.type = workout.type;
        this.duration = workout.duration;
        this.calories = workout.calories;
        this.user = workout.user;
    }

    getId(): number | undefined {
        return this.id;
    }
    getUser(): User {
        return this.user;
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
    }

    equals(workout: Workout): boolean {
        return (
            this.name === workout.getName() &&
            this.intensity === workout.getIntensity() &&
            this.type === workout.getType() &&
            this.duration === workout.getDuration() &&
            this.calories === workout.getCalories() &&
            this.user === workout.getUser()
        );
    }
}
