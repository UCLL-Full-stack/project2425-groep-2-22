const getAllWorkouts = () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/workout',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    })
}
const getWorkoutById = (workoutId: string) => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/workout/${workoutId}` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    })
}
const addExerciseToWorkout = (workoutId: string, exerciseId: string) => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/workout/addExercise`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            workoutId: Number(workoutId),
            exerciseId: Number(exerciseId),
        }),
    });
};
const createWorkout = (workoutData: {
    name: string;
    intensity: string;
    type: string;
    duration: number;
    calories: number;
    user: { id: number | null };
  }) => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/workout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(workoutData),
    });
};

const deleteWorkout = (id: number) => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
      return fetch(`${process.env.NEXT_PUBLIC_API_URL}/workout/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  };
  
const WorkoutService = {
    getAllWorkouts,getWorkoutById,addExerciseToWorkout,createWorkout,deleteWorkout
}
export default WorkoutService;