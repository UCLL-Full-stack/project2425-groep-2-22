import { Workout } from "./workout";
import { User } from "./user";
import {Workout as workoutPrisma, Post as postPrisma, User as UserPrisma} from '@prisma/client';

export class Post {
    private id?: number;
    private title: string;
    private description: string;
    private rating: number;
    private user: User;
    private createdAt: Date;

    constructor(data: {
        id?: number;
        title: string;
        description: string;
        rating: number;
        user: User;
        createdAt?: Date;
    }) {
        this.validate(data);
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.rating = data.rating;
        this.user = data.user;
        this.createdAt = data.createdAt || new Date();
    }

    getId(): number | undefined {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getDescription(): string {
        return this.description;
    }

    getRating(): number {
        return this.rating;
    }

    getUser(): User {
        return this.user;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    validate(data: {
        title: string;
        description: string;
        rating: number;
        user: User;
    }) {
        if (!data.title?.trim()) {
            throw new Error("Title is required");
        }
        if (!data.description?.trim()) {
            throw new Error("Description is required");
        }
        if (data.rating < 0 || data.rating > 5) {
            throw new Error("Rating must be between 0 and 5");
        }
        if (!data.user) {
            throw new Error("User is required");
        }
    }

    static from({
        id,
        title,
        description,
        rating,
        user,
        createdAt
    }: postPrisma & { user: UserPrisma }): Post {
        return new Post({
            id,
            title,
            description,
            rating,
            user: User.from(user),
            createdAt,
        });
    }
}
