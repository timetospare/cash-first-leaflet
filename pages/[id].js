import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import Checkboxes from "../components/Checkboxes";
import orgAPI from "./api/orgs";
import Card from "../components/Card";
import { Pagination } from "../components/Pagination";
import step2API from "./api/step2";
import generalAPI from "./api/general";
import step1 from "../models/step1";

const Leaflet = ({ records, step2Options, general }) => {
  const { query, locale } = useRouter();
  const { id } = query;

  const details =
    general?.find((item) => item?.fields?.Location === id)?.fields || {};

  const [step1Selected, setStep1Selected] = useState([]);
  const [step2Selected, setStep2Selected] = useState(null);

  const [step, setStep] = useState(1);

  const showContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="px-4">
            <h1 className="text-2xl font-medium">What's the problem?</h1>
            <h2 className="text-xl font-light">
              Select 1 or more options to see what local support is available
            </h2>
            <Checkboxes
              options={step1[locale] || step1.en}
              selected={step1Selected}
              updateSelected={(id, value) =>
                setStep1Selected((prevSelec) => {
                  if (!value) {
                    return prevSelec.filter((item) => item !== id);
                  } else {
                    return [...prevSelec, id];
                  }
                })
              }
            />
          </div>
        );
      case 2:
        return (
          <div className="px-4">
            <h1 className="text-2xl font-medium">What are some options?</h1>
            <h2 className="text-xl font-light">
              Click on an option to see who to contact for advice and support on
              these options
            </h2>
            <div className="space-y-4 mt-4">
              {step2Options
                .filter((item) =>
                  item.fields?.Option1?.some((key) =>
                    step1Selected?.includes(key)
                  )
                )
                .map((item) => (
                  <Card
                    details={item.fields}
                    clickable
                    handleCardClick={() => {
                      setStep2Selected(item.fields.Title);
                      setStep((oldStep) => {
                        return oldStep + 1;
                      });
                    }}
                  />
                ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="px-4">
            <h1 className="text-2xl font-medium">Where can I get help?</h1>
            <h2 className="text-xl font-light">
              Each of these services offer free and confidential advice
            </h2>
            <div className="space-y-4 mt-4">
              {records
                .filter((item) => item.fields?.Option2?.includes(step2Selected))
                .map((item) => (
                  <Card details={item.fields} />
                ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>{details?.Title} - Worried about Money?</title>
        <meta
          name="description"
          content="Worrying About Money? Advice and support is available in Sheffield if you’re struggling to make ends meet"
        />
        <meta
          property="og:url"
          content="https://findfood.camden.gov.uk/camden-food"
        />
        <meta property="og:title" content="Sheffield - Worried about Money?" />
        <meta
          property="og:description"
          content="Worrying About Money? Advice and support is available in Sheffield if you’re struggling to make ends meet"
        />
        <meta
          property="twitter:title"
          content="Sheffield - Worried about Money?"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://i.ibb.co/HDff9SP/find-food-twitter.png"
        />
        <meta
          property="og:image"
          content="https://i.ibb.co/HDff9SP/find-food-twitter.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <Pagination
        header={
          <>
            <h1 className="text-3xl font-medium pt-4 pb-2">
              Worrying About Money?
            </h1>
            <h2 className="text-lg font-light  mb-2">
              Advice and support is available in {details?.Title} if you’re
              struggling to make ends meet
            </h2>
          </>
        }
        step={step}
        setStep={setStep}
        step1Selected={step1Selected}
      >
        <>
          {showContent()}
          <footer className="w-full flex flex-row justify-center text-sm text-gray-700 p-2 mt-8">
            <div>
              Powered by{" "}
              <a
                href="https://timetospare.com"
                rel="noopener noreferrer"
                target="_blank"
                className="font-pacifico"
              >
                Time to Spare
              </a>
            </div>
          </footer>
        </>
      </Pagination>
    </>
  );
};

export async function getStaticProps(context) {
  const view = context.params.id;
  const promises = [orgAPI(view), step2API(view), generalAPI("Grid view")];

  const [records, step2Options, general] = await Promise.allSettled(promises);

  return {
    props: {
      records: records.status === "fulfilled" ? records.value : [],
      step2Options:
        step2Options.status === "fulfilled" ? step2Options.value : [],
      general: general.status === "fulfilled" ? general.value : [],
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 100, // In seconds
  };
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  // Get the paths we want to pre-render based on posts
  const paths = [];

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}

export default Leaflet;
