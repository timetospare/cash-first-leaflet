import Head from "next/head";
import { useRouter } from "next/router";

const languageNames = {
  en: "English",
  fr: "French",
  bn: "Bengali",
  ur: "Urdu",
};

export const Layout = ({ children }) => {
  const router = useRouter();
  const { locales, locale } = router;

  return (
    <div className="w-full h-screen flex flex-col p-0">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico"
          rel="stylesheet"
        />
      </Head>
      <header className="w-full p-2 flex flex-row justify-between border-b items-center bg-gray-50">
        <a
          href="https://www.foodaidnetwork.org.uk/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img src="/logo.webp" className="h-8 w-auto"></img>
        </a>
        <div className="flex items-center">
          <form>
            <label
              htmlFor="language"
              className="sr-only block text-sm font-medium text-gray-700"
            >
              Language
            </label>
            <select
              onChange={(e) => {
                router.push(router.asPath, router.asPath, {
                  locale: e.target.value,
                });
              }}
              value={locale}
              id="language"
              name="language"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {locales.map((key) => (
                <option key={key} value={key}>
                  {languageNames[key]}
                </option>
              ))}
            </select>
          </form>
          <a
            href="https://www.foodaidnetwork.org.uk/cash-first-leaflets"
            rel="noopener noreferrer"
            target="_blank"
            className="ml-4 mr-4"
          >
            About
          </a>
        </div>
      </header>
      <main className="w-full h-full overflow-auto">{children}</main>
    </div>
  );
};
