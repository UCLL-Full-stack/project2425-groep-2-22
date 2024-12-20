import Header from "@/components/header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/login");
  };

  return (
    <>
      <Head>
        <title>{t("app.title")}</title>
      </Head>
      <Header />
      <main className="p-6 min-h-screen flex flex-col items-center justify-center text-center">
        <section className="w-full max-w-4xl mb-8">
          <h2 className="text-2xl font-semibold text-blue-500 mb-4">{t("home.users")}</h2>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-300">{t("home.username")}</th>
                <th className="px-4 py-2 border border-gray-300">{t("home.password")}</th>
                <th className="px-4 py-2 border border-gray-300">{t("home.role")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-gray-300">user1</td>
                <td className="px-4 py-2 border border-gray-300">admin123</td>
                <td className="px-4 py-2 border border-gray-300">admin</td>

              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300">user2</td>
                <td className="px-4 py-2 border border-gray-300">trainer123</td>
                <td className="px-4 py-2 border border-gray-300">trainer</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300">user3</td>
                <td className="px-4 py-2 border border-gray-300">member123</td>
                <td className="px-4 py-2 border border-gray-300">member</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="mb-10 text-center">
          <h2 className="text-3xl font-semibold text-blue-500 mb-4">{t("home.welcome.title")}</h2>
          <p className="text-lg">
            {t("home.welcome.description")}
          </p>
        </section>

        <section className="mb-10 text-center">
          <h3 className="text-2xl font-semibold text-blue-500 mb-4">{t("home.whatYouCanDo.title")}</h3>
          <div className="list-disc pl-8 space-y-2 text-lg">
            <p>{t("home.whatYouCanDo.action1")}</p>
            <p>{t("home.whatYouCanDo.action2")}</p>
            <p>{t("home.whatYouCanDo.action3")}</p>
            <p>{t("home.whatYouCanDo.action4")}</p>
            <p>{t("home.whatYouCanDo.action5")}</p>
          </div>
        </section>

        <section className="mb-10 text-center">
          <h3 className="text-2xl font-semibold text-blue-500 mb-4">{t("home.community.title")}</h3>
          <p className="text-lg">
            {t("home.community.description")}
          </p>
        </section>

        <section className="text-center mb-10">
          <h3 className="text-2xl font-semibold text-blue-500 mb-4">{t("home.profile.title")}</h3>
          <p className="text-lg">
            {t("home.profile.description")}
          </p>
          <img className="w-1/2 h-auto mx-auto mt-5 rounded-lg" src="/images/homepageimg.jpg" alt="foto van sporters die stretchen" />
        </section>

        <section className="text-center mt-10">
          <h3 className="text-2xl font-semibold text-blue-500 mb-4">{t("home.start.title")}</h3>
          <button
            onClick={handleGetStarted}
            className="py-2 px-6 bg-green-600 text-white rounded-full text-xl hover:bg-green-700 transition-colors duration-300"
          >
            {t("home.start.getStarted")}
          </button>
        </section>
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

export default HomePage;
