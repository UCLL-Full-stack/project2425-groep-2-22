import exerciseService from '../../service/exercise.service';
import exerciseDb from '../../repository/exercise.db';
import { Exercise } from '../../model/exercise';

let mockGetAllExercises: jest.Mock;

beforeEach(() => {
    mockGetAllExercises = jest.fn();
    exerciseDb.getAllExercises = mockGetAllExercises;
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
