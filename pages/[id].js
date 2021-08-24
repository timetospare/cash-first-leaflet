import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";
import Checkboxes from "../components/Checkboxes";
import orgAPI from "./api/orgs";
import Card from "../components/Card";
import { Pagination } from "../components/Pagination";
import step2API from "./api/step2";
import generalAPI from "./api/general"

const step1 = [
  {
    id: "No Money",
    title: "I suddenly have no money",
    details: [
      "Lost job / reduced hours",
      "Lost money / unexpected expense",
      "Disaster (e.g. flood or fire)",
      "Relationship breakdown",
      "Money stopped (e.g. failed a medical)",
    ],
  },
  {
    id: "Sanctioned",
    title: "I have been sanctioned",
  },
  {
    id: "Awaiting Benefit",
    title: "I am waiting on a benefit payment / decision",
    details: [
      "Made a new claim for benefit",
      "Benefit payment is delayed",
      "Waiting for a benefit decision",
    ],
  },
  {
    id: "Money Doesn't Stretch",
    title: "My money doesn’t stretch far enough",
    details: [
      "Deciding between food / fuel / mobile credit",
      "Low income or zero hours contract",
      "Statutory Sick Pay too low to cover costs",
      "Facing redundancy",
      "Not sure if eligible for support",
      "Change of circumstance (e.g. new baby / bereavement / illness / left partner)",
    ],
  },
  {
    id: "Debt",
    title: "I have debt",
    details: [
      "Rent or Council Tax arrears",
      "Gas or electricity",
      "Payday loans",
      "Owe friends and family",
      "Benefit repayments",
    ],
  },
];

const Leaflet = ({ records, step2Options, general }) => {
  const { query } = useRouter();
  const { id } = query;

  const [step1Selected, setStep1Selected] = useState([]);
  const [step2Selected, setStep2Selected] = useState(null);

  const [step, setStep] = useState(1);

  console.log({ records });
  console.log({ step2Options });
  console.log({general})

  console.log({ step1Selected });

  const showContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="px-4">
            <h1 className="text-2xl font-bold">What's the problem?</h1>
            <h2 className="text-xl font-light">
              Select 1 or more options to see what local support is available
            </h2>
            <Checkboxes
              options={step1}
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
            <h1 className="text-2xl font-bold">What are some options?</h1>
            <h2 className="text-xl font-light">
              Click on an option to see who to contact for advice and support on
              these options
            </h2>
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
        );
      case 3:
        return (
          <div>
            <h1 className="text-2xl font-bold">Where can I get help?</h1>
            <h2 className="text-xl font-light">
              Each of these services offer free and confidential advice
            </h2>
            {records
              .filter((item) => item.fields?.Option2?.includes(step2Selected))
              .map((item) => (
                <Card details={item.fields} />
              ))}
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
        <title>Sheffield - Worried about Money?</title>
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
      <Pagination step={step} setStep={setStep} step1Selected={step1Selected}>
        <>
          {showContent()}
          <footer className="w-full flex flex-row justify-center text-sm text-gray-700 p-2">
            <div>
              Powered by <span className="font-pacifico">Time to Spare</span>
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

  console.log("status", general)

  return {
    props: {
      records: records.status === "fulfilled" ? records.value : [],
      step2Options:
        step2Options.status === "fulfilled" ? step2Options.value : [],
        general:
        general.status === "fulfilled" ? general.value : [],
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
