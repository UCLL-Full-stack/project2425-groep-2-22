import { Workout } from "@/types";
import { useRouter } from "next/router";

type Props = {
    workouts: Array<Workout>;
}

const WorkoutOverviewTable: React.FC<Props> = ({ workouts }) => {
    const router = useRouter();

    const navigateToWorkout = (id: number) => {
        router.push(`/workout/${id}`);
    }

    return (
        <table className="table table-hover mt-6">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Intensity</th>
                    <th scope="col">Calories</th>
                    <th scope="col">Exercises</th>
                </tr>
            </thead>
            <tbody>
                {workouts.map((workout) => (
                    <tr key={workout.id} onClick={() => workout.id && navigateToWorkout(workout.id)}>
                        <td>{workout.name}</td>
                        <td>{workout.type}</td>
                        <td>{workout.duration}</td>
                        <td>{workout.intensity}</td>
                        <td>{workout.calories}</td>
                        <td>{workout.exercises.length}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default WorkoutOverviewTable;
