import { User } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import Language from "../components/language/language";
import { useTranslation } from 'next-i18next';


const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const { t } = useTranslation();
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  const handleClick = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };
  return (
    <header className="bg-blue-600 text-white py-6 flex flex-col items-center shadow-md">
      <a className="text-4xl font-extrabold mb-4">
        myFit
      </a>
      <nav className="flex space-x-8">
        <Link href="/" className="block px-4 py-2 text-lg rounded-md hover:bg-blue-700">
         {t("header.nav.home")}
        </Link>
        {loggedInUser && (
        <Link href="/profile" className="block px-4 py-2 text-lg rounded-md hover:bg-blue-700">
          {t("header.nav.profile")}
        </Link>
        )}
        {loggedInUser && (
        <Link href="/workout" className="block px-4 py-2 text-lg rounded-md hover:bg-blue-700">
          {t("header.nav.workout")}
        </Link>
        )}
        {loggedInUser && (
        <Link href="/exercises" className="block px-4 py-2 text-lg rounded-md hover:bg-blue-700">
          {t("header.nav.exercises")}
        </Link>
        )}
        {loggedInUser && (
        <Link href="/post" className="block px-4 py-2 text-lg rounded-md hover:bg-blue-700">
          {t("header.nav.posts")}
        </Link>
        )}
        {!loggedInUser && (
        <Link href="/login" className="block px-4 py-2 text-lg rounded-md hover:bg-blue-700">
          {t("header.nav.login")}
        </Link>
      )}
        {loggedInUser && (
        <Link href="/login" className="block px-4 py-2 text-lg rounded-md hover:bg-blue-700" onClick={handleClick}>
          {t("header.nav.logout")}
        </Link>
        )}
        <Language />
        {loggedInUser && (
          <div className="text-white ms-5 mt-2 md:mt-0 pt-1 md:pt-0 grow">
            {t('header.welcome')}, {loggedInUser.username}!
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
