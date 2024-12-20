import React, { useState } from "react";
import classNames from "classnames";
import { Workout, Exercise } from "@/types";
import WorkoutService from "@/services/WorkoutService";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

type Props = {
  workouts: Array<Workout>;
  exercises: Array<Exercise>;
  onRemoveWorkout: (id: number) => void;
};

const WorkoutOverview: React.FC<Props> = ({ workouts, exercises, onRemoveWorkout }: Props) => {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout>();
  const router = useRouter();
  const { t } = useTranslation();
  
  
  const selectWorkout = (workout: Workout) => {
    setSelectedWorkout(workout);
  };

  const handleAddExercise = async (exercise: Exercise) => {
    if (!selectedWorkout) return;

    try {
      await WorkoutService.addExerciseToWorkout(
        selectedWorkout.id!.toString(),
        exercise.id!.toString()
      );
      selectedWorkout.exercises.push(exercise);
    } catch (error) {
      console.error("Failed to add exercise to workout:", error);
    }
  };

  const handleDoubleClick = (workoutId: string) => {
    router.push(`/workout/${workoutId}`);
  };

  return (
    <>
      {workouts && (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg mb-6">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th scope="col" className="px-4 py-2">{t('workout.overview.table.name')}</th>
                <th scope="col" className="px-4 py-2">{t('workout.overview.table.type')}</th>
                <th scope="col" className="px-4 py-2">{t('workout.overview.table.intensity')}</th>
                <th scope="col" className="px-4 py-2">{t('workout.overview.table.duration')}</th>
                <th scope="col" className="px-4 py-2">{t('workout.overview.table.calories')}</th>
                <th scope="col" className="px-4 py-2">{t('workout.overview.table.delete')}</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, index) => (
                <tr
                  key={index}
                  onClick={() => selectWorkout(workout)}
                  onDoubleClick={() => handleDoubleClick(workout.id!.toString())}
                  className={classNames("cursor-pointer hover:bg-gray-100", {
                    "bg-gray-200": selectedWorkout?.id === workout.id,
                  })}
                >
                  <td className="px-4 py-2">{workout.name}</td>
                  <td className="px-4 py-2">{workout.type}</td>
                  <td className="px-4 py-2">{workout.intensity}</td>
                  <td className="px-4 py-2">{workout.duration} {t('workout.overview.duration.minute')}</td>
                  <td className="px-4 py-2">{workout.calories}</td>
                  <td className="px-4 py-2">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={() => workout.id !== undefined && onRemoveWorkout(workout.id)}
                >
                  {t('workout.overview.removeButton')}
                </button>
              </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedWorkout && (
        <section className="mt-6">
          <h2 className="text-2xl text-center font-bold text-blue-600 mb-4">
           {t('workout.exercises.exerciseFor')}: {selectedWorkout.name}
          </h2>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th scope="col" className="px-4 py-2">{t('workout.exercises.table.name')}</th>
                  <th scope="col" className="px-4 py-2">{t('workout.exercises.table.description')}</th>
                  <th scope="col" className="px-4 py-2">{t('workout.exercises.table.sets')}</th>
                  <th scope="col" className="px-4 py-2">{t('workout.exercises.table.reps')}</th>
                  <th scope="col" className="px-4 py-2">{t('workout.exercises.table.rest')}</th>
                  <th scope="col" className="px-4 py-2">{t('workout.exercises.table.muscleGroup')}</th>
                  <th scope="col" className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {exercises.map((exercise, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{exercise.name}</td>
                    <td className="px-4 py-2 break-words whitespace-normal">{exercise.description}</td>
                    <td className="px-4 py-2">{exercise.sets}</td>
                    <td className="px-4 py-2">{exercise.reps}</td>
                    <td className="px-4 py-2">{exercise.rest} {t('workout.overview.rest.seconds')}</td>
                    <td className="px-4 py-2">{exercise.muscleGroup}</td>
                    <td className="px-4 py-2">
                      {!selectedWorkout.exercises.find((e) => e.id === exercise.id) && (
                        <button
                          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-md text-sm px-5 py-2.5"
                          onClick={() => handleAddExercise(exercise)}
                        >
                          {t('workout.overview.addExerciseButton')}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
};

export default WorkoutOverview;
