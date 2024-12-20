import { useRouter } from "next/router";

const Language: React.FC = () => {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const handleLanguageChange = (event: { target: { value: string } }) => {
    const newLocale = event.target.value;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <div className="ml-6">
      <label htmlFor="language" className="text-white">
        Language
      </label>
      <select
        id="language"
        className="ml-2 p-1 bg-blue-700 text-white border border-white-600 rounded"
        value={locale}
        onChange={handleLanguageChange}
      >
        <option className="text-black" value="en">
          English
        </option>
        <option className="text-black" value="es">
          Español
        </option>
        <option className="text-black" value="fr">
          Français
        </option>
        <option className="text-black" value="nl">
          Nederlands
        </option>
        <option className="text-black" value="zh">
          中文
        </option>
      </select>
    </div>
  );
};

export default Language;
