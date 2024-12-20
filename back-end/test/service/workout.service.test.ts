import workoutService from '../../service/workout.service';
import workoutDb from '../../repository/workout.db';
import userDb from '../../repository/user.db';
import exerciseDb from '../../repository/exercise.db';
import { Workout } from '../../model/workout';
import { User } from '../../model/user';
import { Exercise } from '../../model/exercise';
import { Role, UserInput } from '../../types';

const userInput = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    weight: 70,
    height: 175,
    gender: 'Male',
    username: 'johndoe',
    password: 'hashedpassword',
    role: 'Admin'as Role,
    workouts: [],
};

const user = new User(userInput);

const exerciseInput = {
    id: 2,
    name: 'Bench Press',
    description: 'Chest exercise',
    sets: 3,
    reps: 10,
    rest: 60,
    muscleGroup: 'Chest',
};

const exercise = new Exercise(exerciseInput);

const workoutInput = {
    id: 1,
    name: 'Full Body Workout',
    intensity: 'High',
    type: 'Strength',
    duration: 45,
    calories: 400,
    user: user,
    exercises: [exercise],
};

const workout = new Workout(workoutInput);

let mockGetAllWorkouts: jest.Mock;
let mockCreateWorkout: jest.Mock;
let mockGetUserById: jest.Mock;
let mockGetWorkoutById: jest.Mock;
let mockGetExerciseById: jest.Mock;
let mockAddExerciseToWorkout: jest.Mock;
let mockFindExerciseInWorkout: jest.Mock;

beforeEach(() => {
    mockGetAllWorkouts = jest.fn();
    mockCreateWorkout = jest.fn();
    mockGetUserById = jest.fn();
    mockGetWorkoutById = jest.fn();
    mockGetExerciseById = jest.fn();
    mockAddExerciseToWorkout = jest.fn();
    mockFindExerciseInWorkout = jest.fn();

    workoutDb.getAllWorkouts = mockGetAllWorkouts;
    workoutDb.createWorkout = mockCreateWorkout;
    userDb.getUserById = mockGetUserById;
    workoutDb.getWorkoutById = mockGetWorkoutById;
    exerciseDb.getExerciseById = mockGetExerciseById;
    workoutDb.addExercise = mockAddExerciseToWorkout;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a call to get all workouts, when workouts are retrieved, then returns an array of workouts', async () => {
    // Given
    const workoutList = [workout];
    mockGetAllWorkouts.mockReturnValue(Promise.resolve(workoutList));

    // When
    const result = await workoutService.getAllWorkouts();

    // Then
    expect(mockGetAllWorkouts).toHaveBeenCalledTimes(1);
    expect(result).toEqual(workoutList);
    expect(result).toHaveLength(1);
});


test('given a workout ID that does not exist, when retrieving a workout, then throws an error', async () => {
    // Given
    const workoutId = 999;
    mockGetWorkoutById.mockReturnValue(Promise.resolve(null));

    // When / Then
    await expect(workoutService.getWorkoutById(workoutId)).rejects.toThrow(`Workout with id ${workoutId} does not exist`);
});

test('given a valid workout ID, when adding an exercise to a workout, then adds the exercise successfully', async () => {
    // Given
    const workoutId = 1;
    const exerciseId = 2;
    const exerciseIdtest = { id: 2 };
    const exercise = { id: 2, name: 'Push Up' }; 
    const workout = { id: 1, exercises: [] };

    mockGetWorkoutById.mockClear();
    mockGetWorkoutById.mockReturnValue(Promise.resolve(workout));
    mockGetExerciseById.mockReturnValue(Promise.resolve(exercise));
    mockFindExerciseInWorkout.mockReturnValue(Promise.resolve(false));
    mockAddExerciseToWorkout.mockReturnValue(Promise.resolve());

    // When
    const result = await workoutService.addExerciseToWorkout(workoutId, exerciseId);

    // Then
    expect(mockGetWorkoutById).toHaveBeenCalledTimes(2);
    expect(mockGetExerciseById).toHaveBeenCalledWith(exerciseIdtest);
    expect(mockAddExerciseToWorkout).toHaveBeenCalledWith(workoutId, exerciseId);
    expect(result).toEqual(workout);
});

test('given an exercise ID that does not exist, when adding an exercise to a workout, then throws an error', async () => {
    // Given
    const workoutId = 1;
    const exerciseId = 999;
    const exerciseIdtest = { id: 999 };
    const workout = { id: 1, exercises: [] };

    mockGetWorkoutById.mockReturnValue(Promise.resolve(workout));
    mockGetExerciseById.mockReturnValue(Promise.resolve(null));

    // When / Then
    await expect(workoutService.addExerciseToWorkout(workoutId, exerciseId)).rejects.toThrow('Exercise not found');
    expect(mockGetWorkoutById).toHaveBeenCalledTimes(1);
    expect(mockGetExerciseById).toHaveBeenCalledWith(exerciseIdtest);
});
