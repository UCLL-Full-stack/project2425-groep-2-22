import React from "react";
import { Exercise } from "@/types";
import classNames from "classnames";

type Props = {
  exercises: Array<Exercise>;
  onRemoveExercise: (id: number) => void;
};

const ExerciseOverviewTable: React.FC<Props> = ({ exercises, onRemoveExercise }: Props) => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const role = loggedInUser ? JSON.parse(loggedInUser).role : null;
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg mb-6">
      <table className="min-w-full table-auto">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th scope="col" className="px-4 py-2">
              Name
            </th>
            <th scope="col" className="px-4 py-2">
              Description
            </th>
            <th scope="col" className="px-4 py-2">
              Sets
            </th>
            <th scope="col" className="px-4 py-2">
              Reps
            </th>
            <th scope="col" className="px-4 py-2">
              Rest
            </th>
            <th scope="col" className="px-4 py-2">
              Muscle Group
            </th>
            <th scope="col" className="px-4 py-2">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => (
            <tr key={exercise.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">{exercise.name}</td>
              <td className="px-4 py-2 break-words whitespace-normal">{exercise.description}</td>
              <td className="px-4 py-2">{exercise.sets}</td>
              <td className="px-4 py-2">{exercise.reps}</td>
              <td className="px-4 py-2">{exercise.rest} sec</td>
              <td className="px-4 py-2">{exercise.muscleGroup}</td>
              <td className="px-4 py-2">
              {role === "admin" && (
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={() => exercise.id !== undefined && onRemoveExercise(exercise.id)}
                >
                  Remove
                </button>
              )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExerciseOverviewTable;
