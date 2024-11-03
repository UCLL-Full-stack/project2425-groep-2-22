import { Workout } from '../../model/workout';
import { User } from '../../model/user';
import { Exercise } from '../../model/exercise';

const user = new User({
    username: 'johnsmith',
    password: 'john123',
    workouts: [],
});

const exercise1 = new Exercise({ id: 1, name: 'Push Ups', description: 'Push up exercise', sets: 3, reps: 15, rest: 60, muscleGroup: 'Chest' });
const exercise2 = new Exercise({ id: 2, name: 'Squats', description: 'Squat exercise', sets: 3, reps: 20, rest: 60, muscleGroup: 'Legs' });

test('given: valid values for workout, when: workout is created, then: workout is created with those values', () => {
    // given
    const workoutData = {
        name: 'Morning Workout',
        intensity: 'High',
        type: 'Strength Training',
        duration: 60,
        calories: 500,
        user: user,
        exercises: [exercise1, exercise2],
    };

    // when
    const workout = new Workout(workoutData);

    // then
    expect(workout.getName()).toEqual(workoutData.name);
    expect(workout.getIntensity()).toEqual(workoutData.intensity);
    expect(workout.getType()).toEqual(workoutData.type);
    expect(workout.getDuration()).toEqual(workoutData.duration);
    expect(workout.getCalories()).toEqual(workoutData.calories);
    expect(workout.getUser()).toEqual(user);
    expect(workout.getExercises()).toContain(exercise1);
    expect(workout.getExercises()).toContain(exercise2);
});

test('given: workout without a name, when: workout is created, then: an error is thrown', () => {
    // given
    const workoutData = {
        name: '',
        intensity: 'High',
        type: 'Strength Training',
        duration: 60,
        calories: 500,
        user: user,
        exercises: [exercise1],
    };

    // when
    const createWorkout = () => new Workout(workoutData);

    // then
    expect(createWorkout).toThrow('Name is required');
});

test('given: workout without intensity, when: workout is created, then: an error is thrown', () => {
    // given
    const workoutData = {
        name: 'Morning Workout',
        intensity: '',
        type: 'Strength Training',
        duration: 60,
        calories: 500,
        user: user,
        exercises: [exercise1],
    };

    // when
    const createWorkout = () => new Workout(workoutData);

    // then
    expect(createWorkout).toThrow('Intensity is required');
});

test('given: workout without type, when: workout is created, then: an error is thrown', () => {
    // given
    const workoutData = {
        name: 'Morning Workout',
        intensity: 'High',
        type: '',
        duration: 60,
        calories: 500,
        user: user,
        exercises: [exercise1],
    };

    // when
    const createWorkout = () => new Workout(workoutData);

    // then
    expect(createWorkout).toThrow('Type is required');
});

test('given: workout without duration, when: workout is created, then: an error is thrown', () => {
    // given
    const workoutData = {
        name: 'Morning Workout',
        intensity: 'High',
        type: 'Strength Training',
        duration: 0,
        calories: 500,
        user: user,
        exercises: [exercise1],
    };

    // when
    const createWorkout = () => new Workout(workoutData);

    // then
    expect(createWorkout).toThrow('Duration is required');
});

test('given: workout without calories, when: workout is created, then: an error is thrown', () => {
    // given
    const workoutData = {
        name: 'Morning Workout',
        intensity: 'High',
        type: 'Strength Training',
        duration: 60,
        calories: 0,
        user: user,
        exercises: [exercise1],
    };

    // when
    const createWorkout = () => new Workout(workoutData);

    // then
    expect(createWorkout).toThrow('Calories is required');
});


test('given: two workouts with different names, when: checking equality, then: they are not equal', () => {
    // given
    const workout1 = new Workout({
        name: 'Morning Workout',
        intensity: 'High',
        type: 'Strength Training',
        duration: 60,
        calories: 500,
        user: user,
        exercises: [exercise1],
    });
    const workout2 = new Workout({
        name: 'Evening Workout',
        intensity: 'High',
        type: 'Strength Training',
        duration: 60,
        calories: 500,
        user: user,
        exercises: [exercise1],
    });

    // when
    const areEqual = workout1.equals(workout2);

    // then
    expect(areEqual).toBe(false);
});
