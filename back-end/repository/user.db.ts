import { User } from '../model/user';
const users = [
    new User({ id: 1, username: 'admin', password: 'admin', workouts: [] }),
    new User({ id: 2, username: 'John', password: 'Wachtwoord1', workouts: [] }),
    new User({ id: 3, username: 'Jane', password: 'Wachtwoord2', workouts: [] }),
]
const getAllUsers  = async (): Promise<User[]> => {
    return users;
}
const getUserById = ({ id }: { id: number }): User | null => {
    try {
        return users.find((user) => user.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}
export default { getAllUsers, getUserById};