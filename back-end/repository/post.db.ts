import { Post } from '../model/post';
import database from '../util/database';
import { Post as PostPrisma } from '@prisma/client';
import { PostInput } from '../types';

const getAllPosts = async (): Promise<Post[]> => {
    try {
        const postsPrisma = await database.post.findMany({
            include: {
                user: true
            }
        });
        return postsPrisma.map((postPrisma) => Post.from(postPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getPostById = async ({ id }: { id: number }): Promise<Post | null> => {
    try {
        const postPrisma = await database.post.findUnique({
            where: { id },
            include: {
                user: true
            }
        });
        return postPrisma ? Post.from(postPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createPost = async ({ title, description, rating, user }: PostInput): Promise<Post> => {
    try {
        const postPrisma = await database.post.create({
            data: {
                title,
                description,
                rating,
                user: {
                    connect: { id: user.id }
                }
            },
            include: {
                user: true 
            }
        });
        return Post.from(postPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllPosts,
    getPostById,
    createPost
};
