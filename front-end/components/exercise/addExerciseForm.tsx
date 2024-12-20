import { StatusMessage } from "../../types";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ExerciseService from "../../services/ExerciseService";

const AddExerciseForm: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sets, setSets] = useState<number | "">("");
  const [reps, setReps] = useState<number | "">("");
  const [rest, setRest] = useState<number | "">("");
  const [muscleGroup, setMuscleGroup] = useState("");

  const [nameError, setNameError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [setsError, setSetsError] = useState<string | null>(null);
  const [repsError, setRepsError] = useState<string | null>(null);
  const [restError, setRestError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  const router = useRouter();

  const clearErrors = () => {
    setNameError(null);
    setDescriptionError(null);
    setSetsError(null);
    setRepsError(null);
    setRestError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let isValid = true;

    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    }
    if (!description.trim()) {
      setDescriptionError("Description is required");
      isValid = false;
    }
    if (sets === "" || sets <= 0) {
      setSetsError("Sets must be a positive number");
      isValid = false;
    }
    if (reps === "" || reps <= 0) {
      setRepsError("Reps must be a positive number");
      isValid = false;
    }
    if (rest === "" || rest < 0) {
      setRestError("Rest must be 0 or a positive number");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    clearErrors();

    if (!validate()) {
      return;
    }

    const newExercise = {
      name,
      description,
      sets: Number(sets),
      reps: Number(reps),
      rest: Number(rest),
      muscleGroup,
    };

    try {
      const response = await ExerciseService.createExercise(newExercise);
      if (response.ok) {
        setStatusMessages([
          { message: "Exercise added successfully", type: "success" },
        ]);

        setTimeout(() => {
          router.push("/exercises");
        }, 2000);
      } else {
        setStatusMessages([
          { message: "Failed to add exercise", type: "error" },
        ]);
      }
    } catch (error) {
      console.error("Error adding exercise:", error);
      setStatusMessages([{ message: "An unexpected error occurred", type: "error" }]);
    }
  };

  const handleCancel = () => {
    router.push("/exercises");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200 mt-20">
      <h3 className="text-lg font-semibold mb-4 text-center">Add Exercise</h3>
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
            htmlFor="descriptionInput"
            className="block text-sm font-medium mb-1"
          >
            Description:
          </label>
          <textarea
            id="descriptionInput"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          ></textarea>
          {descriptionError && (
            <div className="text-red-600 text-sm mt-1">{descriptionError}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="setsInput" className="block text-sm font-medium mb-1">
            Sets:
          </label>
          <input
            id="setsInput"
            type="number"
            value={sets}
            onChange={(e) => setSets(Number(e.target.value) || "")}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          />
          {setsError && <div className="text-red-600 text-sm mt-1">{setsError}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="repsInput" className="block text-sm font-medium mb-1">
            Reps:
          </label>
          <input
            id="repsInput"
            type="number"
            value={reps}
            onChange={(e) => setReps(Number(e.target.value) || "")}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          />
          {repsError && <div className="text-red-600 text-sm mt-1">{repsError}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="restInput" className="block text-sm font-medium mb-1">
            Rest (seconds):
          </label>
          <input
            id="restInput"
            type="number"
            value={rest}
            onChange={(e) => setRest(Number(e.target.value) || "")}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          />
          {restError && <div className="text-red-600 text-sm mt-1">{restError}</div>}
        </div>

        <div className="mb-6">
          <label
            htmlFor="muscleGroupInput"
            className="block text-sm font-medium mb-1"
          >
            Muscle Group:
          </label>
          <input
            id="muscleGroupInput"
            type="text"
            value={muscleGroup}
            onChange={(e) => setMuscleGroup(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
        >
          Add Exercise
        </button>
      </form>
    </div>
  );
};

export default AddExerciseForm;
