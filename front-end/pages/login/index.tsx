import Head from "next/head";
import Header from "../../components/header";
import { useState } from "react";
import UserLoginForm from "../../components/user/userLoginForm";
import UserRegisterForm from "../../components/user/userRegisterForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);  // State to toggle between Login and Register

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <>
      <Head>
        <title>{isLogin ? "User Login" : "User Register"}</title>
      </Head>
      <Header />
      <main>
        <section className="p-6 min-h-screen flex flex-col items-center">
          {isLogin ? <UserLoginForm /> : <UserRegisterForm />}
          <button
            className="mt-4 text-blue-600"
            onClick={toggleForm}
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </section>
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

export default Login;
