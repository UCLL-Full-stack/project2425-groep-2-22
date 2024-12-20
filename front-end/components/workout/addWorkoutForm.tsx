import React, { useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { StatusMessage } from "../../types";
import WorkoutService from "../../services/WorkoutService";

const AddWorkoutForm: React.FC = () => {
  const [name, setName] = useState("");
  const [intensity, setIntensity] = useState("");
  const [type, setType] = useState("");
  const [duration, setDuration] = useState<number | "">("");
  const [calories, setCalories] = useState<number | "">("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [intensityError, setIntensityError] = useState<string | null>(null);
  const [typeError, setTypeError] = useState<string | null>(null);
  const [durationError, setDurationError] = useState<string | null>(null);
  const [caloriesError, setCaloriesError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();

  const clearErrors = () => {
    setNameError(null);
    setIntensityError(null);
    setTypeError(null);
    setDurationError(null);
    setCaloriesError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!name || name.trim() === "") {
      setNameError("Name is required");
      result = false;
    }
    if (!intensity || intensity.trim() === "") {
      setIntensityError("Intensity is required");
      result = false;
    }
    if (!type || type.trim() === "") {
      setTypeError("Type is required");
      result = false;
    }
    if (!duration || duration <= 0) {
      setDurationError("Duration must be a positive number");
      result = false;
    }
    if (!calories || calories <= 0) {
      setCaloriesError("Calories must be a positive number");
      result = false;
    }
    return result;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearErrors();
    if (!validate()) {
      return;
    }
    const loggedInUser = localStorage.getItem("loggedInUser");
    const loggedInUserId = loggedInUser ? JSON.parse(loggedInUser).id : null;
    const workoutData = {
      name,
      intensity,
      type,
      duration: Number(duration),
      calories: Number(calories),
      user: { id: loggedInUserId },
    };
    const response = await WorkoutService.createWorkout(workoutData);
    if (response.ok) {
      setStatusMessages([
        {
          message: "Workout created successfully!",
          type: "success",
        },
      ]);
      setTimeout(() => {
        router.push("/workout");
      }, 2000);
    } else {
      setStatusMessages([
        {
          message: "Failed to create workout",
          type: "error",
        },
      ]);
    }
  };

  const handleCancel = () => {
    router.push("/workout");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200 mt-20">
      <h3 className="text-lg font-semibold mb-4 text-center">Add Workout</h3>
      <button
        onClick={handleCancel}
        className="absolute top-10 right-10 text-xl text-red-500 hover:text-red-800"
      >
        X
      </button>

      {statusMessages && (
        <ul className="mb-4">
          {statusMessages.map(({ message, type }, index) => (
            <li
              key={index}
              className={classNames(
                "text-sm",
                type === "error" ? "text-red-600" : "text-green-600"
              )}
            >
              {message}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nameInput" className="block text-sm font-medium mb-1">
            Name:
          </label>
          <input
            id="nameInput"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          />
          {nameError && <div className="text-red-600 text-sm mt-1">{nameError}</div>}
        </div>

        <div className="mb-4">
          <label
            htmlFor="intensityInput"
            className="block text-sm font-medium mb-1"
          >
            Intensity:
          </label>
          <input
            id="intensityInput"
            type="text"
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          />
          {intensityError && (
            <div className="text-red-600 text-sm mt-1">{intensityError}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="typeInput" className="block text-sm font-medium mb-1">
            Type:
          </label>
          <input
            id="typeInput"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          />
          {typeError && <div className="text-red-600 text-sm mt-1">{typeError}</div>}
        </div>

        <div className="mb-4">
          <label
            htmlFor="durationInput"
            className="block text-sm font-medium mb-1"
          >
            Duration (minutes):
          </label>
          <input
            id="durationInput"
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          />
          {durationError && (
            <div className="text-red-600 text-sm mt-1">{durationError}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="caloriesInput" className="block text-sm font-medium mb-1">
            Calories:
          </label>
          <input
            id="caloriesInput"
            type="number"
            value={calories}
            onChange={(e) => setCalories(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          />
          {caloriesError && (
            <div className="text-red-600 text-sm mt-1">{caloriesError}</div>
          )}
        </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Add Workout
          </button>
      </form>
    </div>
  );
};

export default AddWorkoutForm;
