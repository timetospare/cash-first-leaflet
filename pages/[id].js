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
import ReactMarkdown from "react-markdown";
import linksAPI from "./api/links";
import convertLink from "../methods/convertLink";
import { LinkIcon } from "@heroicons/react/solid";
import { Switch } from "@headlessui/react";
import languageToFathomCode from "../models/languageToFathomCode";
import YoutubeEmbed from "../components/YoutubeEmbed";

const rtlLanguages = ["ur", "fa", "ar", "ps", "apd", "prs"];

const Leaflet = ({ records, step2Options, general, content, links }) => {
  const { query, locale } = useRouter();
  const { id } = query;

  const rtl = rtlLanguages.includes(locale);

  const { Name, ...relevantLinks } =
    links?.find((item) => item?.Name === id) || {};

  const details = general?.find((item) => item?.Location === id) || {};

  const [step1Selected, setStep1Selected] = useState([]);
  const [step2Selected, setStep2Selected] = useState(null);
  const [showBSL, setShowBSL] = useState(false);

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
          bsl: deets[`details-bsl`],
        });
        i += 1;
      } else {
        contentExists = false;
      }
    }
    return optionModel;
  };

  const logos = details?.Logos?.split(",") || [];
  const logosAltText = details?.["Logos Alt Text"]?.split(",") || [];

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
            {showBSL && details["Heading1-bsl"] && (
              <div className="mb-4">
                <YoutubeEmbed videoId={content.step1Heading["details-bsl"]} />
              </div>
            )}

            <Checkboxes
              rtl={rtl}
              showBSL={showBSL}
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
            {showBSL && details["Heading2-bsl"] && (
              <div className="mb-4">
                <YoutubeEmbed videoId={content.step2Heading["details-bsl"]} />
              </div>
            )}
            <div className="space-y-4 mt-4">
              {step2Options
                .filter((item) =>
                  item.fields?.Option1?.some((key) =>
                    step1Selected?.includes(key)
                  )
                )
                .map((item) => (
                  <Card
                    showBSL={showBSL}
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
            {showBSL && details["Heading3-bsl"] && (
              <div className="mb-4">
                <YoutubeEmbed videoId={content.step3Heading["details-bsl"]} />
              </div>
            )}
            <div className="space-y-4 mt-4">
              {records
                .filter((item) => item.fields?.Option2?.includes(step2Selected))
                .map((item) => (
                  <Card
                    rtl={rtl}
                    showBSL={showBSL}
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
                    showBSL={showBSL}
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

  const title = details?.[`Title-${locale}`] || details?.["Title"];

  const renderBSLSwitch = () => {
    if (!details["Heading1-bsl"]) return null;

    return (
      <div className="flex items-center justify-end mb-4">
        <Switch.Group>
          <Switch.Label className="mr-4">Show BSL sign language</Switch.Label>
          <Switch
            checked={showBSL}
            onChange={setShowBSL}
            className={`${
              showBSL ? "bg-blue-600" : "bg-gray-200"
            } relative inline-flex items-center h-6 rounded-full w-11`}
          >
            <span
              className={`${
                showBSL ? "translate-x-6" : "translate-x-1"
              } inline-block w-4 h-4 transform bg-white rounded-full`}
            />
          </Switch>
        </Switch.Group>
      </div>
    );
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>{title} - Worrying about Money?</title>
        <meta
          name="description"
          content={`Worrying About Money? Advice and support is available in ${title} if you're struggling to make ends meet`}
        />
        <meta
          property="og:url"
          content={`https://worryingaboutmoney.co.uk/${id}`}
        />
        <meta property="og:title" content={`${title} - Worried about Money?`} />
        <meta
          property="og:description"
          content={`Worrying About Money? Advice and support is available in ${title} if you're struggling to make ends meet`}
        />
        <meta
          property="twitter:title"
          content={`${title} - Worried about Money?`}
        />
        <meta name="twitter:card" content="summary_large_image" />

        <meta name="twitter:image" content={details?.["Social Image"]} />
        <meta property="og:image" content={details?.["Social Image"]} />

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
            {showBSL && step === 1 && details["Heading1-bsl"] && (
              <div className="mb-4">
                <YoutubeEmbed videoId={details["Heading1-bsl"]} />
              </div>
            )}
            <h2 className="text-lg font-light  mb-2">
              {details[`Heading2-${locale}`] || details[`Heading2`] || (
                <>
                  Advice and support is available in {details?.Title} if you're
                  struggling to make ends meet
                </>
              )}
            </h2>
            {showBSL && step === 1 && details["Heading2-bsl"] && (
              <div className="mb-4">
                <YoutubeEmbed videoId={details["Heading2-bsl"]} />
              </div>
            )}

            {renderBSLSwitch()}

            {!showBSL && Object.keys(relevantLinks).length ? (
              <div className="md:flex flex-wrap pt-2 ">
                {Object.keys(relevantLinks).map((key) => (
                  <a
                    target="_blank"
                    onClick={() => {
                      // track fathom
                      if (typeof window !== "undefined" && window.fathom) {
                        console.log("goal", languageToFathomCode[key]);
                        window.fathom.trackGoal(languageToFathomCode[key], 0);
                      }
                    }}
                    href={convertLink(relevantLinks[key])}
                    rel="noopener noreferrer"
                    className="inline-flex items-center mr-2 mb-2 rounded-full font-medium text-md hover:shadow-md bg-secondary text-primary py-1.5 px-4"
                  >
                    <LinkIcon className="h-4 w-4 mr-2" />
                    {key}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        }
        step={step}
        setStep={setStep}
        step1Selected={step1Selected}
      >
        <>
          {showContent()}
          <footer className="w-full flex flex-col justify-center items-center text-sm text-gray-700 p-2 mt-8 ">
            <ReactMarkdown
              components={{
                // Map `h1` (`# heading`) to use `h2`s.
                a: ({ node, ...props }) => (
                  <a
                    className="underline text-black hover:text-blue-800"
                    onClick={(e) => {
                      // e.preventDefault();
                      e.stopPropagation();
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),
              }}
              className="markdown space-y-4"
              children={
                details?.[`FooterContent-${locale}`] ||
                details?.["FooterContent"] ||
                null
              }
            />

            {logos?.length > 0 && (
              <div className="flex flex-col md:flex justify-center items-center mb-8 mt-4">
                <h3 className="mb-2 text-lg font-medium">Supported by</h3>
                <div className="flex flex-wrap justify-center items-center">
                  {logos.map((src, i) => {
                    return (
                      <img
                        className="w-20 h-16 object-contain mr-2"
                        src={src}
                        key={i}
                        alt={logosAltText?.[i] || ""}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            <div className="text-center">
              <div className="pt-2">
                Find out more about 'Worrying About Money?' leaflets at
                <br />
                <a
                  href="https://www.foodaidnetwork.org.uk/cash-first-leaflets"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="underline"
                >
                  www.foodaidnetwork.org.uk/cash-first-leaflets
                </a>
              </div>{" "}
              <br />
              With thanks to{" "}
              <a
                href="https://plinth.org.uk"
                rel="noopener noreferrer"
                target="_blank"
                className="mb-2 underline"
              >
                Plinth
              </a>
              .
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
    linksAPI("Grid view"),
  ];

  const [records, step2Options, general, content, links] =
    await Promise.allSettled(promises);

  return {
    props: {
      records: records.status === "fulfilled" ? records.value : [],
      links: links.status === "fulfilled" ? links.value : [],
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
