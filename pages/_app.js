import { useRouter } from "next/router";
import { useEffect } from "react";
import "tailwindcss/tailwind.css";
import * as Fathom from "fathom-client";
import { Layout } from "../components/Layout";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { id } = router.query;
  const details =
    pageProps?.general?.find((item) => item?.Location === id) || {};

  const heading1Values = Object.keys(details).filter((key) =>
    key.includes("Heading1")
  );
  const heading1LanguageCodes = heading1Values.map(
    (key) => key.split("Heading1-")[1]
  );

  useEffect(() => {
    // Initialize Fathom when the app loads
    // Example: yourdomain.com
    //  - Do not include https://
    //  - This must be an exact match of your domain.
    //  - If you're using www. for your domain, make sure you include that here.
    Fathom.load("ITTAIZAK", {
      url: "https://cdn.usefathom.com/script.js",
      includedDomains: [
        "www.worryingaboutmoney.co.uk",
        "worryingaboutmoney.co.uk",
      ],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on("routeChangeComplete", onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, []);

  return (
    <Layout enabledLanguages={["en", ...heading1LanguageCodes]}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
