import { Exercise, Workout } from "@/types";
import { useState } from "react";
import ExerciseOverview from "@/components/exercise/ExerciseOverviewTable";

type Props = {
    workout: Workout;
};

const WorkoutInfo: React.FC<Props> = ({ workout }: Props) => {

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
            {workout && (
                <>
                    <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Workout Info</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                        <div>
                            <label className="font-semibold text-blue-700">Name:</label>
                            <p className="text-lg text-gray-800">{workout.name}</p>
                        </div>
                        <div>
                            <label className="font-semibold text-blue-700">Type:</label>
                            <p className="text-lg text-gray-800">{workout.type}</p>
                        </div>
                        <div>
                            <label className="font-semibold text-blue-700">Duration:</label>
                            <p className="text-lg text-gray-800">{workout.duration} minutes</p>
                        </div>
                        <div>
                            <label className="font-semibold text-blue-700">Intensity:</label>
                            <p className="text-lg text-gray-800">{workout.intensity}</p>
                        </div>
                        <div>
                            <label className="font-semibold text-blue-700">Calories:</label>
                            <p className="text-lg text-gray-800">{workout.calories} kcal</p>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h3 className="text-2xl font-semibold text-blue-600 text-center mb-6">Exercises</h3>
                        {workout.exercises.length > 0 ? (
                            <ul className="space-y-6">
                                {workout.exercises.map((exercise) => (
                                    <li key={exercise.id} className="bg-gray-50 p-6 rounded-lg shadow-md hover:bg-blue-50 hover:shadow-lg transition-all ml-10 mr-10">
                                        <h4 className="text-xl font-bold text-blue-600">{exercise.name}</h4>
                                        <div className="mt-4">
                                            <label className="font-semibold text-blue-700">Description:</label>
                                            <p className="text-gray-700">{exercise.description}</p>
                                        </div>
                                        <div className="mt-4">
                                            <label className="font-semibold text-blue-700">Sets:</label>
                                            <p className="text-gray-700">{exercise.sets}</p>
                                        </div>
                                        <div className="mt-4">
                                            <label className="font-semibold text-blue-700">Reps:</label>
                                            <p className="text-gray-700">{exercise.reps}</p>
                                        </div>
                                        <div className="mt-4">
                                            <label className="font-semibold text-blue-700">Rest:</label>
                                            <p className="text-gray-700">{exercise.rest} seconds</p>
                                        </div>
                                        <div className="mt-4">
                                            <label className="font-semibold text-blue-700">Muscle Group:</label>
                                            <p className="text-gray-700">{exercise.muscleGroup}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center text-gray-500">No exercises added to this workout.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default WorkoutInfo;
