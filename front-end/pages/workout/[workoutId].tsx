import Header from "@/components/header";
import WorkoutInfo from "@/components/workout/WorkoutInfo";
import WorkoutService from "@/services/WorkoutService";
import { Workout } from "@/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const workOutById: React.FC = () => {
    const [workout, setWorkout] = useState<Workout | null>(null);
    const router = useRouter();
    const { workoutId } = router.query;

    const getWorkoutById = async () => {
        const workoutResponse = await WorkoutService.getWorkoutById(workoutId as string);
        const workoutData = await workoutResponse.json();
        setWorkout(workoutData);
        
    };

    useEffect(() => {
        if (workoutId) {
            getWorkoutById();
        }
    }, [workoutId]);

    return (
        <>
            <Head>
                <title>Workout</title>
            </Head>
            <Header />
            <main>
                {!workout && <p>Loading</p>}
                {workout && (
                    <section>
                        <WorkoutInfo workout={workout} />
                    </section>
                )}
            </main>
        </>
    );
};
export const getServerSideProps = async (context : any) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ['common']))
    },
  };
};

export default workOutById;
