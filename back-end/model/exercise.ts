import { Workout } from "./workout";

export class Exercise {
    private id?: number;
    private name: string;
    private description: string;
    private sets: number;
    private reps: number;
    private rest: number;
    private muscleGroup: string;

    constructor(exercise: {
        id?: number;
        name: string;
        description: string;
        sets: number;
        reps: number;
        rest: number;
        muscleGroup: string;
    }) {
        this.validate(exercise);
        this.id = exercise.id;
        this.name = exercise.name;
        this.description = exercise.description;
        this.sets = exercise.sets;
        this.reps = exercise.reps;
        this.rest = exercise.rest;
        this.muscleGroup = exercise.muscleGroup;
    }

    getId(): number | undefined {
        return this.id;
    }
    getName(): string {
        return this.name;
    }
    getDescription(): string {
        return this.description;
    }
    getSets(): number {
        return this.sets;
    }
    getReps(): number {
        return this.reps;
    }
    getRest(): number {
        return this.rest;
    }
    getMuscleGroup(): string {
        return this.muscleGroup;
    }

    validate(exercise: {
        name: string;
        description: string;
        sets: number;
        reps: number;
        rest: number;
        muscleGroup: string;
    }) {
        if (!exercise.name?.trim()) {
            throw new Error('Name is required');
        }
        if (!exercise.description?.trim()) {
            throw new Error('Description is required');
        }
        if (!exercise.sets) {
            throw new Error('Sets are required');
        }
        if (!exercise.reps) {
            throw new Error('Reps are required');
        }
        if (!exercise.rest) {
            throw new Error('Rest is required');
        }
        if (!exercise.muscleGroup?.trim()) {
            throw new Error('Muscle group is required');
        }
    }

    equals(exercise: Exercise): boolean {
        return (
            this.name === exercise.getName() &&
            this.description === exercise.getDescription() &&
            this.sets === exercise.getSets() &&
            this.reps === exercise.getReps() &&
            this.rest === exercise.getRest() &&
            this.muscleGroup === exercise.getMuscleGroup()
        );
    }
}
