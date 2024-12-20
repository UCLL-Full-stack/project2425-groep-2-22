import { Workout } from '../../model/workout';
import { User } from '../../model/user';
import { Exercise } from '../../model/exercise';
import { Role } from '../../types';

const user = new User({
    firstName: 'John',
    lastName: 'Smith',
    age: 30,
    weight: 70,
    height: 180,
    gender: 'Male',
    username: 'johnsmith',
    password: 'john123',
    role: 'Admin'as Role,
});

const exercise1 = new Exercise({
    id: 1,
    name: 'Push Ups',
    description: 'Push up exercise',
    sets: 3,
    reps: 15,
    rest: 60,
    muscleGroup: 'Chest',
});

const exercise2 = new Exercise({
    id: 2,
    name: 'Squats',
    description: 'Squat exercise',
    sets: 3,
    reps: 20,
    rest: 60,
    muscleGroup: 'Legs',
});

test('Given: valid parameters, When: workout is created, Then: workout is created successfully', () => {
    // Given
    const workoutData = {
        name: 'Morning Workout',
        intensity: 'High',
        type: 'Strength Training',
        duration: 60,
        calories: 500,
        user,
        exercises: [exercise1, exercise2],
    };

    // When
    const workout = new Workout(workoutData);

    // Then
    expect(workout.getName()).toBe(workoutData.name);
});

test('Given: missing name, When: workout is created, Then: an error is thrown', () => {
    // Given
    const workoutData = {
        name: '',
        intensity: 'High',
        type: 'Strength Training',
        duration: 60,
        calories: 500,
        user,
        exercises: [exercise1],
    };

    // When
    const createWorkout = () => new Workout(workoutData);

    // Then
    expect(createWorkout).toThrow('Name is required');
});

test('Given: missing intensity, When: workout is created, Then: an error is thrown', () => {
    // Given
    const workoutData = {
        name: 'Morning Workout',
        intensity: '',
        type: 'Strength Training',
        duration: 60,
        calories: 500,
        user,
        exercises: [exercise1],
    };

    // When
    const createWorkout = () => new Workout(workoutData);

    // Then
    expect(createWorkout).toThrow('Intensity is required');
});

test('Given: missing type, When: workout is created, Then: an error is thrown', () => {
    // Given
    const workoutData = {
        name: 'Morning Workout',
        intensity: 'High',
        type: '',
        duration: 60,
        calories: 500,
        user,
        exercises: [exercise1],
    };

    // When
    const createWorkout = () => new Workout(workoutData);

    // Then
    expect(createWorkout).toThrow('Type is required');
});

test('Given: missing duration, When: workout is created, Then: an error is thrown', () => {
    // Given
    const workoutData = {
        name: 'Morning Workout',
        intensity: 'High',
        type: 'Strength Training',
        duration: undefined as unknown as number,
        calories: 500,
        user,
        exercises: [exercise1],
    };

    // When
    const createWorkout = () => new Workout(workoutData);

    // Then
    expect(createWorkout).toThrow('Duration is required');
});

test('Given: missing calories, When: workout is created, Then: an error is thrown', () => {
    // Given
    const workoutData = {
        name: 'Morning Workout',
        intensity: 'High',
        type: 'Strength Training',
        duration: 60,
        calories: undefined as unknown as number,
        user,
        exercises: [exercise1],
    };

    // When
    const createWorkout = () => new Workout(workoutData);

    // Then
    expect(createWorkout).toThrow('Calories is required');
});

test('Given: missing user, When: workout is created, Then: an error is thrown', () => {
    // Given
    const workoutData = {
        name: 'Morning Workout',
        intensity: 'High',
        type: 'Strength Training',
        duration: 60,
        calories: 500,
        user: undefined as unknown as User,
        exercises: [exercise1],
    };

    // When
    const createWorkout = () => new Workout(workoutData);

    // Then
    expect(createWorkout).toThrow('User is required');
});

test('Given: missing exercises, When: workout is created, Then: an error is thrown', () => {
    // Given
    const workoutData = {
        name: 'Morning Workout',
        intensity: 'High',
        type: 'Strength Training',
        duration: 60,
        calories: 500,
        user,
        exercises: undefined as unknown as Exercise[],
    };

    // When
    const createWorkout = () => new Workout(workoutData);

    // Then
    expect(createWorkout).toThrow('Exercises are required');
});

test('Given: workouts with different names, When: workouts are compared, Then: they are not equal', () => {
    // Given
    const workoutData1 = {
        name: 'Morning Workout',
        intensity: 'High',
        type: 'Strength Training',
        duration: 60,
        calories: 500,
        user,
        exercises: [exercise1],
    };
    const workoutData2 = {
        name: 'Evening Workout',
        intensity: 'High',
        type: 'Strength Training',
        duration: 60,
        calories: 500,
        user,
        exercises: [exercise1],
    };

    // When
    const workout1 = new Workout(workoutData1);
    const workout2 = new Workout(workoutData2);

    // Then
    expect(workout1.equals(workout2)).toBe(false);
});
