const getAllWorkouts = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/workout',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}
const getWorkoutById = (workoutId: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/workout/${workoutId}` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}
const addExerciseToWorkout = (workoutId: string, exerciseId: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/workout/${workoutId}/exercise/${exerciseId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
const WorkoutService = {
    getAllWorkouts,getWorkoutById,addExerciseToWorkout
}
export default WorkoutService;