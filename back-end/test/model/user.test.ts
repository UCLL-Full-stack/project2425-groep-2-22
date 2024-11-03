import { User } from '../../model/user';
import { Workout } from '../../model/workout';

const workout1 = new Workout({ 
    id: 1, 
    name: 'Morning Run', 
    intensity: 'Medium', 
    type: 'Cardio', 
    duration: 30, 
    calories: 300, 
    user: new User({ username: 'johnsmith', password: 'john123', workouts: [] }), 
    exercises: [] 
});
const workout2 = new Workout({ 
    id: 2, 
    name: 'Strength Training', 
    intensity: 'High', 
    type: 'Strength', 
    duration: 45, 
    calories: 450, 
    user: new User({ username: 'johnsmith', password: 'john123', workouts: [] }), 
    exercises: [] 
});

test('given: valid values for user, when: user is created, then: user is created with those values', () => {
    // given
    const user = {
        username: 'johnsmith',
        password: 'john123',
        workouts: [workout1],
    };

    // when
    const newUser = new User(user);

    // then
    expect(newUser.getUsername()).toEqual(user.username);
    expect(newUser.getPassword()).toEqual(user.password);
    expect(newUser.getWorkouts()).toContain(workout1);
});

test('given: user without a username, when: user is created, then: an error is thrown', () => {
    // given
    const userWithoutUsername = {
        username: '',
        password: 'john123',
        workouts: [workout1],
    };

    // when
    const createUser = () => new User(userWithoutUsername);

    // then
    expect(createUser).toThrow('Username is required');
});

test('given: user without a password, when: user is created, then: an error is thrown', () => {
    // given
    const userWithoutPassword = {
        username: 'johnsmith',
        password: '',
        workouts: [workout1],
    };

    // when
    const createUser = () => new User(userWithoutPassword);

    // then
    expect(createUser).toThrow('Password is required');
});


test('given: two users with different usernames, when: checking equality, then: they are not equal', () => {
    // given
    const user1 = new User({
        username: 'johnsmith',
        password: 'john123',
        workouts: [workout1],
    });
    const user2 = new User({
        username: 'janedoe',
        password: 'john123',
        workouts: [workout1],
    });

    // when
    const areEqual = user1.equals(user2);

    // then
    expect(areEqual).toBe(false);
});

test('given: an existing user, when: adding a new workout, then: the workout is added to the user', () => {
    // given
    const user = new User({
        username: 'johnsmith',
        password: 'john123',
        workouts: [],
    });

    // when
    user.getWorkouts().push(workout1); // This simulates adding a workout

    // then
    expect(user.getWorkouts()).toContain(workout1);
    expect(user.getWorkouts()).toHaveLength(1);
});
