import { Post } from '../../model/post';
import { User } from '../../model/user';
import { Role } from '../../types';

const user = new User({
    firstName: 'John',
    lastName: 'Smith',
    age: 30,
    weight: 70,
    height: 180,
    gender: 'Male',
    username: 'johnsmith',
    password: 'john123',
    role: 'Admin' as Role,
});

test('Given: valid parameters, When: post is created, Then: post is created successfully', () => {
    // Given
    const postData = {
        title: 'My First Post',
        description: 'This is a description of my first post.',
        rating: 4,
        user,
    };

    // When
    const post = new Post(postData);

    // Then
    expect(post.getTitle()).toBe(postData.title);
});

test('Given: missing title, When: post is created, Then: an error is thrown', () => {
    // Given
    const postData = {
        title: '',
        description: 'This is a description of my post.',
        rating: 4,
        user,
    };

    // When
    const createPost = () => new Post(postData);

    // Then
    expect(createPost).toThrow('Title is required');
});

test('Given: missing description, When: post is created, Then: an error is thrown', () => {
    // Given
    const postData = {
        title: 'My First Post',
        description: '',
        rating: 4,
        user,
    };

    // When
    const createPost = () => new Post(postData);

    // Then
    expect(createPost).toThrow('Description is required');
});

test('Given: invalid rating, When: post is created, Then: an error is thrown', () => {
    // Given
    const postData = {
        title: 'My First Post',
        description: 'This is a description of my post.',
        rating: 6,
        user,
    };

    // When
    const createPost = () => new Post(postData);

    // Then
    expect(createPost).toThrow('Rating must be between 0 and 5');
});

test('Given: missing user, When: post is created, Then: an error is thrown', () => {
    // Given
    const postData = {
        title: 'My First Post',
        description: 'This is a description of my post.',
        rating: 4,
        user: undefined as unknown as User,
    };

    // When
    const createPost = () => new Post(postData);

    // Then
    expect(createPost).toThrow('User is required');
});