import { Exercise, Workout } from "@/types";
import { useState } from "react";
import ExerciseOverview from "@/components/exercise/ExerciseOverviewTable";

type Props = {
    workout: Workout;
};

const WorkoutInfo: React.FC<Props> = ({ workout }: Props) => {
    const [showExerciseOverview, setShowExerciseOverview] = useState(false);
    const [updatedWorkout, setUpdatedWorkout] = useState<Workout>(workout);

    const toggleExerciseOverview = () => {
        setShowExerciseOverview((prev) => !prev);
    };

    const updateWorkoutExercises = (newExercise: Exercise) => {
        setUpdatedWorkout((prev) => ({
            ...prev,
            exercises: [...prev.exercises, newExercise],
        }));
    };

    return (
        <div className="workout-info"> {/* Apply the workout-info class */}
            {updatedWorkout && (
                <>
                    <h2>Workout Info</h2>
                    <div>
                        <label><strong>Name:</strong></label>
                        <p>{updatedWorkout.name}</p>
                    </div>
                    <div>
                        <label><strong>Type:</strong></label>
                        <p>{updatedWorkout.type}</p>
                    </div>
                    <div>
                        <label><strong>Duration:</strong></label>
                        <p>{updatedWorkout.duration} minutes</p>
                    </div>
                    <div>
                        <label><strong>Intensity:</strong></label>
                        <p>{updatedWorkout.intensity}</p>
                    </div>
                    <div>
                        <label><strong>Calories:</strong></label>
                        <p>{updatedWorkout.calories} kcal</p>
                    </div>

                    <div>
                        <h3>Exercises:</h3>
                        <button onClick={toggleExerciseOverview}>
                            {showExerciseOverview ? "Close Exercise Overview" : "Add Exercise to Workout"}
                        </button>

                        {showExerciseOverview && (
                            <ExerciseOverview 
                                workoutId={updatedWorkout.id!.toString()}
                                onAddExercise={updateWorkoutExercises}
                            />
                        )}
                        {updatedWorkout.exercises.length > 0 ? (
                            <ul>
                                {updatedWorkout.exercises.map((exercise) => (
                                    <li key={exercise.id}>
                                        <strong>{exercise.name}</strong>
                                        <div>
                                            <label><strong>Description:</strong></label>
                                            <p>{exercise.description}</p>
                                        </div>
                                        <div>
                                            <label><strong>Sets:</strong></label>
                                            <p>{exercise.sets}</p>
                                        </div>
                                        <div>
                                            <label><strong>Reps:</strong></label>
                                            <p>{exercise.reps}</p>
                                        </div>
                                        <div>
                                            <label><strong>Rest:</strong></label>
                                            <p>{exercise.rest} seconds</p>
                                        </div>
                                        <div>
                                            <label><strong>Muscle Group:</strong></label>
                                            <p>{exercise.muscleGroup}</p>
                                        </div>
                                    </li>
                                )) }
                            </ul>
                        ) : (
                            <p>No exercises added to this workout.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default WorkoutInfo;
