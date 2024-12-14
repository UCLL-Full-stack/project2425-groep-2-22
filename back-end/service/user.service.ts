import userDB from '../repository/user.db';
import { User } from '../model/user';
import { UserInput } from '../types';

const getAllUsers = async (): Promise<User[]> => userDB.getAllUsers();

const getUserById = async (id: number): Promise<User> => {
    const user = await userDB.getUserById({ id });
    if (!user) throw new Error(`User with id ${id} does not exist.`);
    return user;
};

const getUserByUsername = async (username: string): Promise<User> => {
    const user = await userDB.getUserByUsername({ username });
    if (!user) throw new Error(`User with username ${username} does not exist.`);
    return user;
};
const createUser = async ({ username, password }: UserInput): Promise<User> => {
      const existingUser = await userDB.getUserByUsername({ username });
      if (existingUser) {
          throw new Error('The user already exists');
      }
      const userInput: UserInput = { 
          username, 
          password
      };
      return await userDB.createUser(userInput);
};

export default { getAllUsers, getUserById, getUserByUsername, createUser };
