import postService from '../../service/post.service';
import postDB from '../../repository/post.db';
import userDB from '../../repository/user.db';
import { Post } from '../../model/post';
import { User } from '../../model/user';
import { Role } from '../../types';

let mockGetAllPosts: jest.Mock;
let mockGetPostById: jest.Mock;
let mockCreatePost: jest.Mock;
let mockGetUserById: jest.Mock;

beforeEach(() => {
    mockGetAllPosts = jest.fn();
    mockGetPostById = jest.fn();
    mockCreatePost = jest.fn();
    mockGetUserById = jest.fn();

    postDB.getAllPosts = mockGetAllPosts;
    postDB.getPostById = mockGetPostById;
    postDB.createPost = mockCreatePost;
    userDB.getUserById = mockGetUserById;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('Given: a call to get all posts, When: posts are retrieved, Then: returns an array of posts', async () => {
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
    const postList = [
        new Post({
            id: 1,
            title: 'Post 1',
            description: 'Description 1',
            rating: 5,
            user,
        }),
        new Post({
            id: 2,
            title: 'Post 2',
            description: 'Description 2',
            rating: 4,
            user,
        }),
    ];
    mockGetAllPosts.mockReturnValue(Promise.resolve(postList));

    // When
    const result = await postService.getAllPosts();

    // Then
    expect(mockGetAllPosts).toHaveBeenCalledTimes(1);
    expect(result).toEqual(postList);
    expect(result).toHaveLength(2);
});

test('Given: no posts in the database, When: get all posts is called, Then: returns an empty array', async () => {
    // Given
    mockGetAllPosts.mockReturnValue(Promise.resolve([]));

    // When
    const result = await postService.getAllPosts();

    // Then
    expect(mockGetAllPosts).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
});

test('Given: a valid post ID, When: getPostById is called, Then: returns the post', async () => {
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
    const post = new Post({
        id: 1,
        title: 'Post 1',
        description: 'Description 1',
        rating: 5,
        user,
    });
    mockGetPostById.mockReturnValue(Promise.resolve(post));

    // When
    const result = await postService.getPostById(1);

    // Then
    expect(mockGetPostById).toHaveBeenCalledTimes(1);
    expect(result).toEqual(post);
});

test('Given: an invalid post ID, When: getPostById is called, Then: throws an error', async () => {
    // Given
    mockGetPostById.mockReturnValue(Promise.resolve(null));

    // When / Then
    await expect(postService.getPostById(999)).rejects.toThrow('Post with id 999 does not exist.');
    expect(mockGetPostById).toHaveBeenCalledTimes(1);
});