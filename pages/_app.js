import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";
import { Layout } from "../components/Layout";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { id } = router.query;
  const details =
    pageProps?.general?.find((item) => item?.fields?.Location === id)?.fields ||
    {};

  const heading1Values = Object.keys(details).filter((key) =>
    key.includes("Heading1")
  );
  const heading1LanguageCodes = heading1Values.map(
    (key) => key.split("Heading1-")[1]
  );

  return (
    <Layout enabledLanguages={["en", ...heading1LanguageCodes]}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
