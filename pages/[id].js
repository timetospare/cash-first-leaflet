import { useRouter } from "next/router";
import { useState } from "react";
import Checkboxes from "../components/Checkboxes";
import orgAPI from "./api/orgs";
import { Pagination } from "../components/Pagination";
import step2API from "./api/step2";

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

const Leaflet = ({ records, step2Options }) => {
  const { query } = useRouter();
  const { id } = query;

  const [step1Selected, setStep1Selected] = useState([]);

  const [step, setStep] = useState(1);

  console.log({ records });
  console.log({ step2Options });

  console.log({ step1Selected });
  return (
    <Pagination step={step} setStep={setStep}>
      {id}
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
    </Pagination>
  );
};

export async function getStaticProps() {
  const promises = [orgAPI("view"), step2API("view")];

  const [records, step2Options] = await Promise.allSettled(promises);

  return {
    props: {
      records: records.status === "fulfilled" ? records.value : [],
      step2Options:
        step2Options.status === "fulfilled" ? step2Options.value : [],
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
