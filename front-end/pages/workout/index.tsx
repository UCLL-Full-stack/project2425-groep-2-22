import Header from "../../components/header";
import WorkoutOverview from "../../components/workout/WorkoutOverviewTable";
import WorkoutService from "../../services/WorkoutService";
import ExerciseService from "../../services/ExerciseService";
import Head from "next/head";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const Workouts: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const [errorMessage, setError] = useState<string | null>(null);
    
    const getWorkoutsAndExercises = async () => {
        try {
            const responses = await Promise.all([
                WorkoutService.getAllWorkouts(),
                ExerciseService.getAllExercises(),
            ]);

            const [workoutResponse, exercisesResponse] = responses;
            if (workoutResponse.status === 401 || exercisesResponse.status === 401) {
                setError("You are not authorized to view this page");
                return;
            }

            const workout = await workoutResponse.json();
            const exercises = await exercisesResponse.json();
            return { workout, exercises };
        } catch (error) {
            if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
                setError("You are not authorized to view this page");
            } else {
                setError("An unexpected error occurred");
            }
        }
    };

    const removeWorkout = async (id: number) => {
        try {
            await WorkoutService.deleteWorkout(id);
            mutate("workoutsAndExercises");
        } catch (error) {
            console.error("Failed to remove workout:", error);
        }
    };

    const { data, isLoading, error } = useSWR("workoutsAndExercises", getWorkoutsAndExercises);

    useInterval(() => {
        mutate("workoutsAndExercises", getWorkoutsAndExercises());
    }, 1000);

    return (
        <>
            <Head>
                <title>{t("workout.workouts.page.title")}</title>
            </Head>
            <Header />
            <main className="p-6 min-h-screen flex flex-col items-center">
                <h1 className="text-2xl text-center font-bold text-blue-600 mb-4">{t("workout.workouts.page.title")}</h1>
                {!errorMessage && (
                    <button
                        onClick={() => router.push("/workout/addWorkout")}
                        className="mb-6 py-2 px-4 bg-green-600 text-white rounded-full"
                    >
                        {t("workout.workouts.addWorkoutButton")}
                    </button>
                )}

                {errorMessage && <div className="text-red-800">{errorMessage}</div>}
                {error && <div className="text-red-800">{error}</div>}
                {isLoading && <p className="text-green-800">{t("workout.workouts.page.loading")}</p>}
                {data && (
                    <WorkoutOverview
                        workouts={data.workout}
                        onRemoveWorkout={removeWorkout}
                        exercises={data.exercises}
                    />
                )}
            </main>
        </>
    );
};

export const getServerSideProps = async (context: any) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ['common']))
        },
    };
};

export default Workouts;
