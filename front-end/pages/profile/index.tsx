import React, { useEffect, useState } from "react";
import Profile from "../../components/profile/ProfileOverviewTable";
import Head from "next/head";
import Header from "../../components/header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next';



const ProfilePage: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const { t } = useTranslation();


  useEffect(() => {
    const userData = localStorage.getItem("loggedInUser");
    if (userData) {
      setLoggedInUser(JSON.parse(userData));
    }
  }, []);
  if (!loggedInUser) {
    return <div>{t('profile.page.loading')}</div>;
  }

  return (
    <>
      <Head>
          <title>{t('profile.page.title')}</title>
      </Head>
      <Header/>
      <div className="py-10 px-5">
        <Profile user={loggedInUser} />
      </div>
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

export default ProfilePage;
