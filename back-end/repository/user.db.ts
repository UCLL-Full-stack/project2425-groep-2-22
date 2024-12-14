import { User } from '../model/user';
import { Workout } from '../model/workout'; 
import { Post } from '../model/post';
import database from '../util/database';
import { UserInput } from '../types'; 
import { User as UserPrisma, Workout as WorkoutPrisma, Post as PostPrisma } from '@prisma/client';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany({
            include: {
                posts: true,
                workouts: true
            }
        });
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id },
            include: {
                posts: true,
                workouts: true
            }
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByUsername = async ({ username }: { username: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { username },
            include: {
                posts: true,
                workouts: true
            }
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createUser = async ({ username, password}: UserInput ): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                username,
                password,
            },
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};



export default {
    getAllUsers,
    getUserById,
    getUserByUsername,
    createUser
};
