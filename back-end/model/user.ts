import { Workout } from "./workout";
import { Post } from "./post";
import {Workout as workoutPrisma, Post as postPrisma, User as UserPrisma} from '@prisma/client';

export class User {
    private id?: number;
    private username: string;
    private password: string;
    constructor(user: {
        id?: number;
        username: string;
        password: string;
    }) {
        this.validate(user);
        this.id = user.id
        this.username = user.username;
        this.password = user.password;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }
    getPassword(): string {
        return this.password;
    }

    validate(user: {
        id?: number;
        username: string;
        password: string;
    }) {
        if (!user.username?.trim()) {
            throw new Error('Username is required');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
    }

    equals(user: User): boolean {
        return (
            this.username === user.getUsername() &&
            this.password === user.getPassword() 
        );
    }
    static from({
        id,
        username,
        password,
    }: UserPrisma ): User {
        return new User({
            id,
            username,
            password,
        });
    }
}
