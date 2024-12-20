import { User } from '../../model/user';
import { Role } from '../../types';

test('given: valid values for user, when: user is created, then: user is created with those values', () => {
    // given
    const user = {
        id: 1,
        firstName: 'John',
        lastName: 'Smith',
        age: 30,
        weight: 70,
        height: 175,
        gender: 'Male',
        username: 'johnsmith',
        password: 'john123',
        role: 'Admin'as Role,
    };

    // when
    const newUser = new User(user);

    // then
    expect(newUser.getId()).toEqual(user.id);
    expect(newUser.getFirstName()).toEqual(user.firstName);
    expect(newUser.getLastName()).toEqual(user.lastName);
    expect(newUser.getAge()).toEqual(user.age);
    expect(newUser.getWeight()).toEqual(user.weight);
    expect(newUser.getHeight()).toEqual(user.height);
    expect(newUser.getGender()).toEqual(user.gender);
    expect(newUser.getUsername()).toEqual(user.username);
    expect(newUser.getPassword()).toEqual(user.password);
    expect(newUser.getRole()).toEqual(user.role);
});

test('given: user without a first name, when: user is created, then: an error is thrown', () => {
    // given
    const userWithoutFirstName = {
        firstName: '',
        lastName: 'Smith',
        age: 30,
        weight: 70,
        height: 175,
        gender: 'Male',
        username: 'johnsmith',
        password: 'john123',
        role: ''as any,
    };

    // when
    const createUser = () => new User(userWithoutFirstName);

    // then
    expect(createUser).toThrow('First name is required');
});

test('given: user without a last name, when: user is created, then: an error is thrown', () => {
    // given
    const userWithoutLastName = {
        firstName: 'John',
        lastName: '',
        age: 30,
        weight: 70,
        height: 175,
        gender: 'Male',
        username: 'johnsmith',
        password: 'john123',
        role: ''as any,
    };

    // when
    const createUser = () => new User(userWithoutLastName);

    // then
    expect(createUser).toThrow('Last name is required');
});

test('given: user without an age, when: user is created, then: an error is thrown', () => {
    // given
    const userWithoutAge = {
        firstName: 'John',
        lastName: 'Smith',
        age: 0,
        weight: 70,
        height: 175,
        gender: 'Male',
        username: 'johnsmith',
        password: 'john123',
        role: ''as any,
    };

    // when
    const createUser = () => new User(userWithoutAge);

    // then
    expect(createUser).toThrow('Age is required');
});

test('given: user with a negative weight, when: user is created, then: an error is thrown', () => {
    // given
    const userWithoutWeight = {
        firstName: 'John',
        lastName: 'Smith',
        age: 30,
        height: 175,
        weight : -70,
        gender: 'Male',
        username: 'johnsmith',
        password: 'john123',
        role: ''as any,
    };

    // when
    const createUser = () => new User(userWithoutWeight);

    // then
    expect(createUser).toThrow('Weight is required');
});

test('given: user with a negative height, when: user is created, then: an error is thrown', () => {
    // given
    const userWithoutHeight = {
        firstName: 'John',
        lastName: 'Smith',
        age: 30,
        height: -175,
        weight: 70,
        gender: 'Male',
        username: 'johnsmith',
        password: 'john123',
        role: ''as any,
    };

    // when
    const createUser = () => new User(userWithoutHeight);

    // then
    expect(createUser).toThrow('Height is required');
});

test('given: user without a gender, when: user is created, then: an error is thrown', () => {
    // given
    const userWithoutGender = {
        firstName: 'John',
        lastName: 'Smith',
        age: 30,
        weight: 70,
        height: 175,
        gender: '',
        username: 'johnsmith',
        password: 'john123',
        role: ''as any,
    };

    // when
    const createUser = () => new User(userWithoutGender);

    // then
    expect(createUser).toThrow('Gender is required');
});

test('given: user without a username, when: user is created, then: an error is thrown', () => {
    // given
    const userWithoutUsername = {
        firstName: 'John',
        lastName: 'Smith',
        age: 30,
        weight: 70,
        height: 175,
        gender: 'Male',
        username: '',
        password: 'john123',
        role: ''as any,
    };

    // when
    const createUser = () => new User(userWithoutUsername);

    // then
    expect(createUser).toThrow('Username is required');
});

test('given: user without a password, when: user is created, then: an error is thrown', () => {
    // given
    const userWithoutPassword = {
        firstName: 'John',
        lastName: 'Smith',
        age: 30,
        weight: 70,
        height: 175,
        gender: 'Male',
        username: 'johnsmith',
        password: '',
        role: ''as any,
    };

    // when
    const createUser = () => new User(userWithoutPassword);

    // then
    expect(createUser).toThrow('Password is required');
});

test('given: user without a role, when: user is created, then: an error is thrown', () => {
    // given
    const userWithoutRole = {
        firstName: 'John',
        lastName: 'Smith',
        age: 30,
        weight: 70,
        height: 175,
        gender: 'Male',
        username: 'johnsmith',
        password: 'john123',
        role: ''as any,
    };

    // when
    const createUser = () => new User(userWithoutRole);

    // then
    expect(createUser).toThrow('Role is required');
});