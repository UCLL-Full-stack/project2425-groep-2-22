import { Workout } from '../model/workout';
import { User } from '../model/user';
const Workouts = [
    new Workout({ id: 1, name: 'Hardlopen', intensity: 'Hoog', type: 'Cardio', duration: 30, calories: 200, user: new User({ id: 3, username: 'user3', password: 'Wachtwoorduser3', workouts: [] }) }),
]
const getAllWorkouts  = async (): Promise<Workout[]> => {
    return Workouts;
}
export default { getAllWorkouts, Workouts };