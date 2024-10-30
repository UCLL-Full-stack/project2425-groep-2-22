import { User } from '../model/user';
const Users = [
    new User({ id: 1, username: 'admin', password: 'admin', workouts: [] }),
    new User({ id: 2, username: 'John', password: 'Wachtwoord1', workouts: [] }),
    new User({ id: 3, username: 'Jane', password: 'Wachtwoord2', workouts: [] }),
]
const getAllUsers  = async (): Promise<User[]> => {
    return Users;
}
export default { getAllUsers };