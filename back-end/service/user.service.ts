import { User } from "../model/user";
import userDb from "../repository/user.db";

const getAllUsers = async (): Promise<User[]> => {
  return userDb.getAllUsers();
}
const getUserById = (id: number): User | null => {
    const user = userDb.getUserById({id: id });
    if(user){
        return user;
    }throw new Error(`User with id ${id} does not exist`);
};
export default { getAllUsers, getUserById };