import workoutService from '../../service/workout.service';
import workoutDb from '../../repository/workout.db';
import userDb from '../../repository/user.db';
import exerciseDb from '../../repository/exercise.db';
import { Workout } from '../../model/workout';
import { User } from '../../model/user';
import { Exercise } from '../../model/exercise';

const userInput = {
    id: 1,
    username: 'johndoe',
    password: 'johnd123',
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
    name: 'Full Body Workout',
    intensity: 'High',
    type: 'Strength',
    duration: 45,
    calories: 400,
    user: userInput,
    exercises: [exerciseInput],
};

const workout = new Workout({
    ...workoutInput,
    user: user,
    exercises: [exercise],
});

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
    workoutDb.addExerciseToWorkout = mockAddExerciseToWorkout;
    workoutDb.findExerciseInWorkout = mockFindExerciseInWorkout;
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

test('given valid workout data, when creating a workout, then the workout is created successfully', async () => {
    // Given
    mockGetUserById.mockReturnValue(Promise.resolve(user));
    mockCreateWorkout.mockReturnValue(workout);

    // When
    const result = await workoutService.createWorkout(workoutInput);

    // Then
    expect(mockGetUserById).toHaveBeenCalledWith({ id: userInput.id });
    expect(mockCreateWorkout).toHaveBeenCalledTimes(1);
    expect(result).toBeInstanceOf(Workout);
    expect(result).toEqual(workout);
});


test('given a workout ID that does not exist, when retrieving a workout, then throws an error', () => {
    // Given
    const workoutId = 999;
    mockGetWorkoutById.mockReturnValue(null);
    
    const getWorkout = () => {
        workoutService.getWorkoutById(workoutId);
    };

    // When & Then
    expect(getWorkout).toThrowError(`Workout with id ${workoutId} does not exist`);
});

test('given a valid workout ID, when adding an exercise to a workout, then adds the exercise successfully', async () => {
    // Given
    const workoutId = 1;
    const exerciseId = exerciseInput.id;
    
    mockGetWorkoutById.mockReturnValue(Promise.resolve(workout));
    mockGetExerciseById.mockReturnValue(Promise.resolve(exercise));
    mockFindExerciseInWorkout.mockReturnValue(Promise.resolve(false));

    // When
    const result = await workoutService.addExerciseToWorkout(workoutId, exerciseId);

    // Then
    expect(mockGetWorkoutById).toHaveBeenCalledWith({ id: workoutId });
    expect(mockGetExerciseById).toHaveBeenCalledWith({ id: exerciseId });
    expect(mockAddExerciseToWorkout).toHaveBeenCalledWith(workout, exercise);
    expect(result).toEqual(workout);
});
