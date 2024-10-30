import { Workout } from "./workout";

export class User {
    private id?: number;
    private username: string;
    private password: string;
    private workouts: Workout[];
    constructor(user: {
        id?: number;
        username: string;
        password: string;
        workouts: Workout[];
    }) {
        this.validate(user);
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.workouts = user.workouts;
    }

    getId(): number | undefined {
        return this.id;
    }
    getWorkouts(): Workout[] {
        return this.workouts;
    }

    getUsername(): string {
        return this.username;
    }
    getPassword(): string {
        return this.password;
    }

    validate(user: {
        username: string;
        password: string;
        workouts: Workout[];
    }) {
        if (!user.username?.trim()) {
            throw new Error('Username is required');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
        if (!user.workouts) {
            throw new Error('Workouts are required');
        }
    }

    equals(user: User): boolean {
        return (
            this.username === user.getUsername() &&
            this.password === user.getPassword() &&
            this.workouts === user.getWorkouts()
        );
    }
}
