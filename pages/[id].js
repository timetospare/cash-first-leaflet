import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import Checkboxes from "../components/Checkboxes";
import orgAPI from "./api/orgs";
import Card from "../components/Card";
import { Pagination } from "../components/Pagination";
import step2API from "./api/step2";
import generalAPI from "./api/general";
import contentAPI from "./api/content";
import step1 from "../models/step1";
import defaultContent from "../models/defaultContent";

const rtlLanguages = ["ur", "fa", "ar"];

const Leaflet = ({ records, step2Options, general, content }) => {
  const { query, locale } = useRouter();
  const { id } = query;

  const rtl = rtlLanguages.includes(locale);

  const details =
    general?.find((item) => item?.fields?.Location === id)?.fields || {};

  const [step1Selected, setStep1Selected] = useState([]);
  const [step2Selected, setStep2Selected] = useState(null);

  const [step, setStep] = useState(1);

  const generateCheckboxOptions = () => {
    const optionModel = [];
    let contentExists = true;
    let i = 1;
    while (contentExists) {
      if (content[`step1option${i}`]) {
        const deets = content[`step1option${i}`];
        const details = deets[`details-${locale}`] || deets[`details-en`] || "";

        optionModel.push({
          id: step1.en[i - 1].id,
          title: deets[`text-${locale}`] || deets["text-en"],
          details: details
            .replace(/- /g, "")
            .split("\n")
            .filter((item) => item),
        });
        i += 1;
      } else {
        contentExists = false;
      }
    }
    return optionModel;
  };

  const logos = details?.Logos?.split(",") || [];

  const showContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h1 className={`text-2xl font-medium ${rtl ? "text-right" : ""}`}>
              {content.step1Heading[`text-${locale}`] ||
                content.step1Heading[`text-en`]}
            </h1>
            <h2 className={`text-xl font-light ${rtl ? "text-right" : ""}`}>
              {content.step1Subheading[`text-${locale}`] ||
                content.step1Subheading[`text-en`]}
            </h2>
            <Checkboxes
              rtl={rtl}
              options={generateCheckboxOptions()}
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
          <div>
            <h1 className={`text-2xl font-medium ${rtl ? "text-right" : ""}`}>
              {content.step2Heading[`text-${locale}`] ||
                content.step2Heading[`text-en`]}
            </h1>
            <h2 className={`text-xl font-light ${rtl ? "text-right" : ""}`}>
              {content.step2Subheading[`text-${locale}`] ||
                content.step2Subheading[`text-en`]}
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
                    rtl={rtl}
                    content={content}
                    key={item.id}
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
          <div>
            <h1 className={`text-2xl font-medium ${rtl ? "text-right" : ""}`}>
              {content.step3Heading[`text-${locale}`] ||
                content.step3Heading[`text-en`]}
            </h1>
            <h2 className={`text-xl font-light ${rtl ? "text-right" : ""}`}>
              {content.step3Subheading[`text-${locale}`] ||
                content.step3Subheading[`text-en`]}
            </h2>
            <div className="space-y-4 mt-4">
              {records
                .filter((item) => item.fields?.Option2?.includes(step2Selected))
                .map((item) => (
                  <Card
                    rtl={rtl}
                    content={content}
                    key={item.id}
                    details={item.fields}
                  />
                ))}
            </div>
            <h1 className="text-2xl font-medium mt-12">
              {content.step3OtherHeading[`text-${locale}`] ||
                content.step3OtherHeading[`text-en`]}
            </h1>
            <div className="space-y-4 mt-4">
              {records
                .filter((item) => item.fields?.Option2?.includes("Other"))
                .map((item) => (
                  <Card
                    rtl={rtl}
                    content={content}
                    key={item.id}
                    details={item.fields}
                  />
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
        {/*
          <meta
          name="twitter:image"
          content="https://i.ibb.co/HDff9SP/find-food-twitter.png"
        />
        <meta
          property="og:image"
          content="https://i.ibb.co/HDff9SP/find-food-twitter.png"
        />
          */}

        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <Pagination
        rtl={rtl}
        content={content}
        header={
          <div className={rtl ? "text-right" : ""}>
            <h1 className="text-3xl font-medium pt-4 pb-2">
              {details[`Heading1-${locale}`] || details[`Heading1`]}
            </h1>
            <h2 className="text-lg font-light  mb-2">
              {details[`Heading2-${locale}`] || details[`Heading2`] || (
                <>
                  Advice and support is available in {details?.Title} if you’re
                  struggling to make ends meet
                </>
              )}
            </h2>
          </div>
        }
        step={step}
        setStep={setStep}
        step1Selected={step1Selected}
      >
        <>
          {showContent()}
          <footer className="w-full flex flex-col justify-center items-center text-sm text-gray-700 p-2 mt-8 ">
            {logos?.length > 0 && (
              <div className="flex flex-col md:flex justify-center items-center mb-8">
                <h3 className="mb-2 text-lg font-medium mb-2">Supported by</h3>
                <div className="flex flex-wrap justify-center items-center">
                  {logos.map((src, i) => {
                    return (
                      <img
                        className="w-20 h-16 object-contain mr-2"
                        src={src}
                        key={i}
                        alt=""
                      />
                    );
                  })}
                </div>
              </div>
            )}
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
  const promises = [
    orgAPI(view),
    step2API(view),
    generalAPI("Grid view"),
    contentAPI("Grid view"),
  ];

  const [records, step2Options, general, content] = await Promise.allSettled(
    promises
  );

  return {
    props: {
      records: records.status === "fulfilled" ? records.value : [],
      step2Options:
        step2Options.status === "fulfilled" ? step2Options.value : [],
      general: general.status === "fulfilled" ? general.value : [],
      content:
        content.status === "fulfilled"
          ? content.value?.reduce((obj, item) => {
              const { content, ...rest } = item.fields;
              obj[content] = rest;
              return obj;
            }, {})
          : defaultContent,
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
