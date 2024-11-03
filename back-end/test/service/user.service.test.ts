import userService from '../../service/user.service';
import userDb from '../../repository/user.db';
import { User } from '../../model/user';

const userInput = {
    id: 1,
    username: 'johndoe',
    password: 'johnd123',
    workouts: [],
};

const user = new User(userInput);

let mockGetAllUsers: jest.Mock;
let mockGetUserById: jest.Mock;

beforeEach(() => {
    mockGetAllUsers = jest.fn();
    mockGetUserById = jest.fn();

    userDb.getAllUsers = mockGetAllUsers;
    userDb.getUserById = mockGetUserById;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a call to get all users, when users are retrieved, then returns an array of users', async () => {
    // Given
    const userList = [user];
    mockGetAllUsers.mockReturnValue(Promise.resolve(userList));

    // When
    const result = await userService.getAllUsers();

    // Then
    expect(mockGetAllUsers).toHaveBeenCalledTimes(1);
    expect(result).toEqual(userList);
    expect(result).toHaveLength(1);
});

test('given a valid user ID, when retrieving a user, then returns the user', () => {
    // Given
    const userId = userInput.id;
    mockGetUserById.mockReturnValue(user);
    
    // When
    const result = userService.getUserById(userId);

    // Then
    expect(mockGetUserById).toHaveBeenCalledWith({ id: userId });
    expect(result).toEqual(user);
});

test('given an invalid user ID, when retrieving a user, then throws an error', () => {
    // Given
    const userId = 999; // Non-existing user ID
    mockGetUserById.mockReturnValue(null);

    const getUser = () => {
        userService.getUserById(userId);
    };

    // When & Then
    expect(getUser).toThrowError(`User with id ${userId} does not exist`);
});
