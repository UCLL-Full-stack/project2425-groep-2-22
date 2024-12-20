import userDB from '../repository/user.db';
import bcrypt from 'bcrypt';
import { User } from '../model/user';
import { UserInput } from '../types';
import { AuthenticationResponse } from '../types';
import { generateJWTtoken } from '../util/jwt';


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
const createUser = async ({
    username,
    password,
    role = "member",
    firstName,
    lastName,
    age,
    weight,
    height,
    gender,
  }: UserInput): Promise<User> => {
    const existingUser = await userDB.getUserByUsername({ username });
    if (existingUser) {
      throw new Error("The user already exists");
    }
    const encryptedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      username,
      password: encryptedPassword,
      role,
      firstName,
      lastName,
      age,
      weight,
      height,
      gender,
    });
    return await userDB.createUser(user);
  };
  
const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername(username);
    if (!user) {
        throw new Error('User does not exist.')
    }
    const validPassword = await bcrypt.compare(password, user.getPassword())

    if (!validPassword) {
        throw new Error('Invalid password or username.')
    }
    const userId = user.getId();
    if (userId === undefined) {
        throw new Error('User ID is undefined.');
    }

    return {
        id: userId,
        token: generateJWTtoken({username, role: user.getRole()}),
        username: username,
        role: user.getRole(),
        firstName: user.getFirstName(),
        lastName: user.getLastName(),
        age: user.getAge(),
        weight: user.getWeight(),
        height: user.getHeight(),
        gender: user.getGender()
    };
};

export default { getAllUsers, getUserById, getUserByUsername, createUser, authenticate };
