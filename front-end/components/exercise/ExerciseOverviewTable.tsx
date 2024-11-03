import { Exercise } from "@/types";
import WorkoutService from "@/services/WorkoutService";
import ExerciseService from "@/services/ExerciseService";
import { useEffect, useState } from "react";

type Props = {
    workoutId: string;
    onAddExercise: (exercise: Exercise) => void; // Accept the callback
};

const ExerciseOverview: React.FC<Props> = ({ workoutId, onAddExercise }) => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [statusMessage, setStatusMessage] = useState<string>("");

    useEffect(() => {
        fetchExercises();
    }, []);

    const fetchExercises = async () => {
        const response = await ExerciseService.getAllExercises();
        const exercisesData = await response.json();
        setExercises(exercisesData);
    };

    const handleAddExercise = async (exercise: Exercise) => {
        try {
            const response = await WorkoutService.addExerciseToWorkout(workoutId, exercise.id!.toString());
            if (response.ok) {
                onAddExercise(exercise); // Call the callback to update the workout with the full exercise object
                setStatusMessage(`Exercise "${exercise.name}" added successfully!`);
            } else {
                setStatusMessage("Failed to add exercise. Please try again.");
            }
        } catch (error) {
            setStatusMessage("An error occurred while adding the exercise.");
        }
    };

    return (
        <div>
            <h2>Select an Exercise to Add</h2>
            {statusMessage && <p>{statusMessage}</p>}
            <ul>
                {exercises.map((exercise) => (
                    <li key={exercise.id}>
                        <span>{exercise.name} - {exercise.muscleGroup}</span>
                        <button onClick={() => handleAddExercise(exercise)}>Add</button> {/* Pass the full exercise object */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExerciseOverview;
