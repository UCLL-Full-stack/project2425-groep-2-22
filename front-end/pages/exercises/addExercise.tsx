import React from "react";
import { useRouter } from "next/router";
import ExerciseService from "@/services/ExerciseService";
import useSWR, { mutate } from "swr";
import Head from "next/head";
import Header from "../../components/header";
import AddExerciseForm from "../../components/exercise/addExerciseForm";

const addExercises: React.FC = () => {
  return (
    <>
    <div>
      <AddExerciseForm />
    </div>
    </>
  );
};

export default addExercises;
