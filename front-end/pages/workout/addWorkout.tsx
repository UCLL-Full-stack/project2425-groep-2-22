import React from "react";
import { useRouter } from "next/router";
import ExerciseService from "@/services/ExerciseService";
import useSWR, { mutate } from "swr";
import Head from "next/head";
import Header from "../../components/header";
import AddWorkoutForm from "../../components/workout/addWorkoutForm";

const addWorkout: React.FC = () => {
  return (
    <>
      <AddWorkoutForm />
    </>
  );
};

export default addWorkout;
