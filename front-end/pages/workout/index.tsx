import { useState } from "react";
import type { Workout } from "@/types";
import Header from "@/components/header";
import Head from "next/head";
import { useEffect } from "react";
import WorkoutService from "@/services/WorkoutService";
import WorkoutOverviewTable from "@/components/workout/WorkoutOverviewTable";

const Workout: React.FC = () => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const getWorkouts = async () => {
        const response = await WorkoutService.getAllWorkouts();
        const workouts = await response.json();
        setWorkouts(workouts);
    }
    useEffect(()=>{
        getWorkouts()
    },[]);
    return(
        <>
            <Head>
                <title>Workout</title>
            </Head>
            <Header></Header>
            <main>
                <h1>Workout</h1>
                <section>
                    {workouts && (
                        <WorkoutOverviewTable workouts={workouts} />
                    )}
                </section>
            </main>
        </>
    );
}
export default Workout;