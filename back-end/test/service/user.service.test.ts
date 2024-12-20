import userService from '../../service/user.service';
import userDb from '../../repository/user.db';
import { User } from '../../model/user';
import { Role, UserInput } from '../../types';

let mockGetAllUsers: jest.Mock;
let mockGetUserById: jest.Mock;
let mockGetUserByUsername: jest.Mock;
let mockCreateUser: jest.Mock;
let mockAuthenticate: jest.Mock;

beforeEach(() => {
    mockGetAllUsers = jest.fn();
    mockGetUserById = jest.fn();
    mockGetUserByUsername = jest.fn();
    mockCreateUser = jest.fn();
    mockAuthenticate = jest.fn();

    userDb.getAllUsers = mockGetAllUsers;
    userDb.getUserById = mockGetUserById;
    userDb.getUserByUsername = mockGetUserByUsername;
    userDb.createUser = mockCreateUser;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('Given: a call to get all users, When: users are retrieved, Then: returns an array of users', async () => {
    // Given
    const userList = [
        new User({
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
        }),
        new User({
            id: 2,
            firstName: 'Jane',
            lastName: 'Doe',
            age: 28,
            weight: 60,
            height: 165,
            gender: 'Female',
            username: 'janedoe',
            password: 'hashedpassword',
            role: 'Admin'as Role,
        }),
    ];
    mockGetAllUsers.mockReturnValue(Promise.resolve(userList));

    // When
    const result = await userService.getAllUsers();

    // Then
    expect(mockGetAllUsers).toHaveBeenCalledTimes(1);
    expect(result).toEqual(userList);
    expect(result).toHaveLength(2);
});

test('Given: no users in the database, When: get all users is called, Then: returns an empty array', async () => {
    // Given
    mockGetAllUsers.mockReturnValue(Promise.resolve([]));

    // When
    const result = await userService.getAllUsers();

    // Then
    expect(mockGetAllUsers).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
});

test('Given: a valid user ID, When: getUserById is called, Then: returns the user', async () => {
    // Given
    const user = new User({
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
    });
    mockGetUserById.mockReturnValue(Promise.resolve(user));

    // When
    const result = await userService.getUserById(1);

    // Then
    expect(mockGetUserById).toHaveBeenCalledTimes(1);
    expect(result).toEqual(user);
});

test('Given: an invalid user ID, When: getUserById is called, Then: throws an error', async () => {
    // Given
    mockGetUserById.mockReturnValue(Promise.resolve(null));

    // When / Then
    await expect(userService.getUserById(999)).rejects.toThrow('User with id 999 does not exist.');
    expect(mockGetUserById).toHaveBeenCalledTimes(1);
});
test('Given: a valid username, When: getUserByUsername is called, Then: returns the user', async () => {
    // Given
    const user = new User({
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
        weight: 70,
        height: 175,
        gender: 'Male',
        username: 'johndoe',
        password: 'hashedpassword',
        role: 'Admin' as Role,
    });
    mockGetUserByUsername.mockReturnValue(Promise.resolve(user));

    // When
    const result = await userService.getUserByUsername('johndoe');

    // Then
    expect(mockGetUserByUsername).toHaveBeenCalledTimes(1);
    expect(result).toEqual(user);
});

test('Given: an invalid username, When: getUserByUsername is called, Then: throws an error', async () => {
    // Given
    mockGetUserByUsername.mockReturnValue(Promise.resolve(null));

    // When / Then
    await expect(userService.getUserByUsername('invalidusername')).rejects.toThrow('User with username invalidusername does not exist.');
    expect(mockGetUserByUsername).toHaveBeenCalledTimes(1);
});