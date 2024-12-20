import exerciseService from '../../service/exercise.service';
import exerciseDb from '../../repository/exercise.db';
import { Exercise } from '../../model/exercise';

let mockGetAllExercises: jest.Mock;
let mockGetExerciseById: jest.Mock;
let mockCreateExercise: jest.Mock;
let mockDeleteExercise: jest.Mock;

beforeEach(() => {
    mockGetAllExercises = jest.fn();
    mockGetExerciseById = jest.fn();
    mockCreateExercise = jest.fn();
    mockDeleteExercise = jest.fn();

    exerciseDb.getAllExercises = mockGetAllExercises;
    exerciseDb.getExerciseById = mockGetExerciseById;
    exerciseDb.createExercise = mockCreateExercise;
    exerciseDb.deleteExercise = mockDeleteExercise;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: a call to get all exercises, when: exercises are retrieved, then: returns an array of exercises', async () => {
    // Given
    const exerciseList = [
        new Exercise({
            name: 'Bench Press',
            description: 'A compound exercise for the chest.',
            sets: 3,
            reps: 10,
            rest: 60,
            muscleGroup: 'Chest',
        }),
        new Exercise({
            name: 'Squats',
            description: 'A compound exercise for the legs.',
            sets: 3,
            reps: 12,
            rest: 90,
            muscleGroup: 'Legs',
        }),
    ];

    mockGetAllExercises.mockReturnValue(Promise.resolve(exerciseList));

    // When
    const result = await exerciseService.getAllExercises();

    // Then
    expect(mockGetAllExercises).toHaveBeenCalledTimes(1);
    expect(result).toEqual(exerciseList);
    expect(result).toHaveLength(2);
});

test('given: no exercises in the database, when: get all exercises is called, then: returns an empty array', async () => {
    // Given
    mockGetAllExercises.mockReturnValue(Promise.resolve([]));

    // When
    const result = await exerciseService.getAllExercises();

    // Then
    expect(mockGetAllExercises).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
});

test('given: a valid exercise id, when: getExerciseById is called, then: returns the exercise', async () => {
    // Given
    const exercise = new Exercise({
        name: 'Bench Press',
        description: 'A compound exercise for the chest.',
        sets: 3,
        reps: 10,
        rest: 60,
        muscleGroup: 'Chest',
    });

    mockGetExerciseById.mockReturnValue(Promise.resolve(exercise));

    // When
    const result = await exerciseService.getExerciseById(1);

    // Then
    expect(mockGetExerciseById).toHaveBeenCalledTimes(1);
    expect(result).toEqual(exercise);
});

test('given: an invalid exercise id, when: getExerciseById is called, then: throws an error', async () => {
    // Given
    mockGetExerciseById.mockReturnValue(Promise.resolve(null));

    // When / Then
    await expect(exerciseService.getExerciseById(999)).rejects.toThrow('Exercise with id 999 does not exist.');
    expect(mockGetExerciseById).toHaveBeenCalledTimes(1);
});

test('given: valid exercise data, when: createExercise is called, then: creates and returns the exercise', async () => {
    // Given
    const exerciseInput = {
        name: 'Bench Press',
        description: 'A compound exercise for the chest.',
        sets: 3,
        reps: 10,
        rest: 60,
        muscleGroup: 'Chest',
    };

    const exercise = new Exercise(exerciseInput);

    mockCreateExercise.mockReturnValue(Promise.resolve(exercise));

    // When
    const result = await exerciseService.createExercise(exerciseInput);

    // Then
    expect(mockCreateExercise).toHaveBeenCalledTimes(1);
    expect(result).toEqual(exercise);
});


test('given: a valid exercise id, when: deleteExercise is called, then: deletes and returns the exercise', async () => {
    // Given
    const exercise = new Exercise({
        name: 'Bench Press',
        description: 'A compound exercise for the chest.',
        sets: 3,
        reps: 10,
        rest: 60,
        muscleGroup: 'Chest',
    });

    mockGetExerciseById.mockReturnValue(Promise.resolve(exercise));
    mockDeleteExercise.mockReturnValue(Promise.resolve(exercise));

    // When
    const result = await exerciseService.deleteExercise(1);

    // Then
    expect(mockGetExerciseById).toHaveBeenCalledTimes(1);
    expect(mockDeleteExercise).toHaveBeenCalledTimes(1);
    expect(result).toEqual(exercise);
});

test('given: an invalid exercise id, when: deleteExercise is called, then: throws an error', async () => {
    // Given
    mockGetExerciseById.mockReturnValue(Promise.resolve(null));

    // When / Then
    await expect(exerciseService.deleteExercise(999)).rejects.toThrow('Exercise does not exist.');
    expect(mockGetExerciseById).toHaveBeenCalledTimes(1);
    expect(mockDeleteExercise).not.toHaveBeenCalled();
});
