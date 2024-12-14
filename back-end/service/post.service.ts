import postDB from '../repository/post.db';
import userDB from '../repository/user.db';
import { Post } from '../model/post';
import { PostInput, UserInput } from '../types';

const getAllPosts = async (): Promise<Post[]> => postDB.getAllPosts();

const getPostById = async (id: number): Promise<Post> => {
    const post = await postDB.getPostById({ id });
    if (!post) throw new Error(`Post with id ${id} does not exist.`);
    return post;
};

const createPost = async ({ title, description, rating, user }: PostInput): Promise<Post> => {
    if (user.id === undefined) {
        throw new Error('User id is required.');
    }
    const userFromDb = await userDB.getUserById({ id: user.id });

    if (!userFromDb) {
        throw new Error(`User with id ${user.id} not found.`);
    }
    const postInput: PostInput = {
        title,
        description,
        rating,
        user
    };

    return await postDB.createPost(postInput);
};


export default { getAllPosts, getPostById, createPost };
