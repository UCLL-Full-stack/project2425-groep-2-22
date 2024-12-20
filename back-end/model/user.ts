import { Workout } from "./workout";
import { Post } from "./post";
import { Role } from '../types';
import {Workout as workoutPrisma, Post as postPrisma, User as UserPrisma} from '@prisma/client';

export class User {
    private id?: number;
    private firstName: string;
    private lastName: string;
    private age: number;
    private weight: number;
    private height: number;
    private gender: string;
    private username: string;
    private password: string;
    private role: Role;
    constructor(user: {
        id?: number;
        firstName: string;
        lastName: string;
        age: number;
        weight: number;
        height: number;
        gender: string;        
        username: string;
        password: string;
        role: Role;
    }) {
        this.validate(user);
        this.id = user.id
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.age = user.age;
        this.weight = user.weight;
        this.height = user.height;
        this.gender = user.gender;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
    }

    getId(): number | undefined {
        return this.id;
    }
    getFirstName(): string {
        return this.firstName;
    }
    getLastName(): string {
        return this.lastName;
    }
    getAge(): number {
        return this.age;
    }
    getWeight(): number {
        return this.weight;
    }
    getHeight(): number {
        return this.height;
    }
    getGender(): string {
        return this.gender;
    }

    getUsername(): string {
        return this.username;
    }
    getPassword(): string {
        return this.password;
    }
    getRole(): Role {
        return this.role;
    }

    validate(user: {
        id?: number;
        firstName: string;
        lastName: string;
        age: number;
        weight: number;
        height: number;
        gender: string;
        username: string;
        password: string;
        role: Role;
    }) {
        if (!user.firstName?.trim()) {
            throw new Error('First name is required');
        }
        if (!user.lastName?.trim()) {
            throw new Error('Last name is required');
        }
        if (!user.age) {
            throw new Error('Age is required');
        }
        if (!user.weight || user.weight <= 0) {
            throw new Error('Weight is required');
        }
        if (!user.height|| user.height <= 0) {
            throw new Error('Height is required');
        }
        if (!user.gender?.trim()) {
            throw new Error('Gender is required');
        }
        if (!user.username?.trim()) {
            throw new Error('Username is required');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
        if (!user.role) {
            throw new Error('Role is required');
        }
    }

    equals(user: User): boolean {
        return (
            this.firstName === user.getFirstName() &&
            this.lastName === user.getLastName() &&
            this.age === user.getAge() &&
            this.weight === user.getWeight() &&
            this.height === user.getHeight() &&
            this.gender === user.getGender() &&
            this.username === user.getUsername() &&
            this.password === user.getPassword() &&
            this.role === user.getRole()
        );
    }
    static from({
        id,
        firstName,
        lastName,
        age,
        weight,
        height,
        gender,
        username,
        password,
        role,
    }: UserPrisma ): User {
        return new User({
            id,
            firstName,
            lastName,
            age,
            weight,
            height,
            gender,
            username,
            password,
            role: role as Role
        });
    }
}
