import Head from "next/head";
import { useRouter } from "next/router";

const languageNames = {
  en: "English",
  cy: "Cymraeg/Welsh",
  es: "Spanish",
  fr: "French",
  bn: "Bengali",
  ur: "Urdu",
  ru: "Russian",
  prs: "Dari",
  so: "Somali",
  alb: "Albanian",
  tr: "Turkish",
  apd: "Sudanese Arabic",
  ti: "Tigrinya",
  ar: "Arabic",
  pl: "Polish",
  ro: "Romanian",
  fa: "Farsi",
  sk: "Slovakian",
  gd: "Gaelic",
  bg: "Bulgarian",
  ps: "Pashto",
  ua: "Ukrainian",
  zh: "Chinese (简单)",
  "zh-CHT": "Chinese (繁體)",
  hu: "Hungarian",
  ru: "Russian",
  ckb: "Kurdish Sorani",
};

export const Layout = ({ children, enabledLanguages }) => {
  const router = useRouter();
  const { locales, locale, query } = router;
  const { embed } = query;

  return (
    <div className="w-full h-screen flex flex-col p-0">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico"
          rel="stylesheet"
        />
      </Head>
      {!embed && (
        <header className="w-full p-2 flex flex-row justify-between border-b items-center bg-gray-50">
          <a
            href="https://www.foodaidnetwork.org.uk/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img src="/logo.webp" alt="IFAN logo" className="h-8 w-auto"></img>
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
                {locales
                  .filter(
                    (key) => !enabledLanguages || enabledLanguages.includes(key)
                  )
                  .map((key) => (
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
      )}

      <main className="w-full h-full overflow-auto">{children}</main>
    </div>
  );
};
