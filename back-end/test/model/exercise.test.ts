import { Exercise } from '../../model/exercise';

test('given: valid values for exercise, when: exercise is created, then: exercise is created with those values', () => {
    // given
    const exerciseData = {
        id: 1,
        name: 'Bench Press',
        description: 'A compound exercise that works the chest, shoulders, and triceps.',
        sets: 3,
        reps: 10,
        rest: 60,
        muscleGroup: 'Chest',
    };

    // when
    const exercise = new Exercise(exerciseData);

    // then
    expect(exercise.getId()).toEqual(exerciseData.id);
    expect(exercise.getName()).toEqual(exerciseData.name);
    expect(exercise.getDescription()).toEqual(exerciseData.description);
    expect(exercise.getSets()).toEqual(exerciseData.sets);
    expect(exercise.getReps()).toEqual(exerciseData.reps);
    expect(exercise.getRest()).toEqual(exerciseData.rest);
    expect(exercise.getMuscleGroup()).toEqual(exerciseData.muscleGroup);
});

test('given: exercise without a name, when: exercise is created, then: an error is thrown', () => {
    // given
    const exerciseData = {
        id: 1,
        name: '',
        description: 'A compound exercise that works the chest, shoulders, and triceps.',
        sets: 3,
        reps: 10,
        rest: 60,
        muscleGroup: 'Chest',
    };

    // when
    const createExercise = () => new Exercise(exerciseData);

    // then
    expect(createExercise).toThrow('Name is required');
});

test('given: exercise without a description, when: exercise is created, then: an error is thrown', () => {
    // given
    const exerciseData = {
        id: 1,
        name: 'Bench Press',
        description: '',
        sets: 3,
        reps: 10,
        rest: 60,
        muscleGroup: 'Chest',
    };

    // when
    const createExercise = () => new Exercise(exerciseData);

    // then
    expect(createExercise).toThrow('Description is required');
});

test('given: exercise without sets, when: exercise is created, then: an error is thrown', () => {
    // given
    const exerciseData = {
        id: 1,
        name: 'Bench Press',
        description: 'A compound exercise that works the chest, shoulders, and triceps.',
        sets: 0,
        reps: 10,
        rest: 60,
        muscleGroup: 'Chest',
    };

    // when
    const createExercise = () => new Exercise(exerciseData);

    // then
    expect(createExercise).toThrow('Sets are required');
});

test('given: exercise without reps, when: exercise is created, then: an error is thrown', () => {
    // given
    const exerciseData = {
        id: 1,
        name: 'Bench Press',
        description: 'A compound exercise that works the chest, shoulders, and triceps.',
        sets: 3,
        reps: 0,
        rest: 60,
        muscleGroup: 'Chest',
    };

    // when
    const createExercise = () => new Exercise(exerciseData);

    // then
    expect(createExercise).toThrow('Reps are required');
});

test('given: exercise without rest, when: exercise is created, then: an error is thrown', () => {
    // given
    const exerciseData = {
        id: 1,
        name: 'Bench Press',
        description: 'A compound exercise that works the chest, shoulders, and triceps.',
        sets: 3,
        reps: 10,
        rest: 0,
        muscleGroup: 'Chest',
    };

    // when
    const createExercise = () => new Exercise(exerciseData);

    // then
    expect(createExercise).toThrow('Rest is required');
});

test('given: exercise without a muscle group, when: exercise is created, then: an error is thrown', () => {
    // given
    const exerciseData = {
        id: 1,
        name: 'Bench Press',
        description: 'A compound exercise that works the chest, shoulders, and triceps.',
        sets: 3,
        reps: 10,
        rest: 60,
        muscleGroup: '',
    };

    // when
    const createExercise = () => new Exercise(exerciseData);

    // then
    expect(createExercise).toThrow('Muscle group is required');
});

test('given: two exercises with the same details, when: checking equality, then: they are equal', () => {
    // given
    const exercise1 = new Exercise({
        id: 1,
        name: 'Bench Press',
        description: 'A compound exercise that works the chest, shoulders, and triceps.',
        sets: 3,
        reps: 10,
        rest: 60,
        muscleGroup: 'Chest',
    });
    const exercise2 = new Exercise({
        id: 2,
        name: 'Bench Press',
        description: 'A compound exercise that works the chest, shoulders, and triceps.',
        sets: 3,
        reps: 10,
        rest: 60,
        muscleGroup: 'Chest',
    });

    // when
    const areEqual = exercise1.equals(exercise2);

    // then
    expect(areEqual).toBe(true);
});

test('given: two exercises with different names, when: checking equality, then: they are not equal', () => {
    // given
    const exercise1 = new Exercise({
        id: 1,
        name: 'Bench Press',
        description: 'A compound exercise that works the chest, shoulders, and triceps.',
        sets: 3,
        reps: 10,
        rest: 60,
        muscleGroup: 'Chest',
    });
    const exercise2 = new Exercise({
        id: 2,
        name: 'Squats',
        description: 'A lower body exercise that targets the legs and glutes.',
        sets: 3,
        reps: 15,
        rest: 60,
        muscleGroup: 'Legs',
    });

    // when
    const areEqual = exercise1.equals(exercise2);

    // then
    expect(areEqual).toBe(false);
});
