import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ExerciseService from "@/services/ExerciseService";
import useSWR, { mutate } from "swr";
import Head from "next/head";
import Header from "../../components/header";
import ExerciseOverviewTable from "../../components/exercise/ExerciseOverviewTable";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Exercises: React.FC = () => {
  const router = useRouter();
  const [errorMessage, setError] = useState<string>();
  const [role, setRole] = useState<string | null>(null);

  const getExercises = async () => {
    try {
      const response = await ExerciseService.getAllExercises();
      if (!response.ok) {
        if (response.status === 401) {
          setError("You are not authorized to view this page");
        } else {
          setError(response.statusText);
        }
      } else {
        const exercises = await response.json(); 
        return exercises;
      }
    } catch (error) {
      //CORS preflight bleef mijn unauthorized error overschrijven vandaar deze oplossing om toch unauthorized te tonen
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) { 
        setError("You are not authorized to view this page");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const { data, isLoading, error: swrError } = useSWR("exercises", getExercises);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const userRole = loggedInUser ? JSON.parse(loggedInUser).role : null;
    setRole(userRole);
  }, []);

  const removeExercise = async (id: number) => {
    try {
      await ExerciseService.deleteExercise(id);
      mutate("exercises");
    } catch (error) {
      console.error("Failed to remove exercise:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Exercises</title>
      </Head>
      <Header />
      <main className="p-6 min-h-screen flex flex-col items-center">
        <h1 className="text-2xl text-center font-bold text-blue-600 mb-4">
          All Exercises
        </h1>
        { (role === "admin" || role === "trainer") && (
        <button
          onClick={() => router.push("/exercises/addExercise")}
          className="mb-6 py-2 px-4 bg-green-600 text-white rounded-full"
        >
          + Add Exercise
        </button>
        )}

        {errorMessage && <div className="text-red-800">{errorMessage}</div>}
        {swrError && <div className="text-red-800">{swrError.message}</div>} 
        {isLoading && <p className="text-green-800">Loading...</p>}
        {data && (
          <ExerciseOverviewTable
            exercises={data}
            onRemoveExercise={removeExercise}
          />
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

export default Exercises;
