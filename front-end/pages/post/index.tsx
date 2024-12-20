import Header from "../../components/header";
import Head from "next/head";
import useSWR, { mutate } from "swr";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from "react";
import { useRouter } from "next/router";
import PostService from "@/services/PostService";
import PostOverviewTable from "@/components/post/PostOverviewTable";

const Posts: React.FC = () => {
  const router = useRouter();
  const [errorMessage, setError] = useState<string | null>(null);

  const getPosts = async () => {
    try {
      const response = await PostService.getAllPosts();

      if (response.status === 401) {
        setError("You are not authorized to view this page");
        return;
      }
      if (!response.ok) {
        setError(response.statusText);
        return;
      }

      const posts = await response.json();
      return posts;
    } catch (error) {
      //CORS preflight bleef mijn unauthorized error overschrijven vandaar deze oplossing om toch unauthorized te tonen
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        setError("You are not authorized to view this page");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const { data, isLoading, error: swrError } = useSWR("posts", getPosts);

  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <Header />
      <main className="flex flex-col items-center">
        <h1 className="text-2xl text-center font-bold text-blue-600 mb-4">Posts</h1>
        {!errorMessage && (
          <button
            onClick={() => router.push("/post/addPost")}
            className="mb-6 py-2 px-4 bg-green-600 text-white rounded-full"
          >
            + Add Post
          </button>
        )}

        {errorMessage && <div className="text-red-800">{errorMessage}</div>}
        {swrError && <div className="text-red-800">{swrError.message}</div>}
        {isLoading && <p className="text-green-800">Loading...</p>}
        
      </main>
      {data && <PostOverviewTable posts={data} />}
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

export default Posts;
