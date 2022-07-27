import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PostcodeLookup from "../components/PostcodeLookup";
import defaultContent from "../models/defaultContent";
import contentAPI from "./api/content";
import generalAPI from "./api/general";

const Home = ({ areas, content }) => {
  const { locale, query } = useRouter();
  const { embed } = query;
  const [postcodeObj, setPostcodeObj] = useState(null);

  const filteredAreas = postcodeObj
    ? [
        areas[0],
        ...areas.filter((area) =>
          area.Title?.replace(new RegExp("&", "g"), "")
            .replace(new RegExp("and", "g"), "")
            .toLowerCase()
            .includes(
              postcodeObj.names?.laua
                .replace(new RegExp("&", "g"), "")
                .replace(new RegExp("and", "g"), "")
                .toLowerCase()
            )
        ),
      ]
    : areas;

  return (
    <div className="min-h-screen py-2">
      <Head>
        <title>
          {content.mainTitle[`text-${locale}`] || content.mainTitle[`text-en`]}
        </title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="w-full max-w-6xl mx-auto px-2">
        <h1 className="text-3xl my-6 font-medium">
          {content.mainTitle[`text-${locale}`] || content.mainTitle[`text-en`]}
        </h1>
        <PostcodeLookup handleSearch={(obj) => setPostcodeObj(obj)} />
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
          {filteredAreas.map((area) =>
            embed ? (
              <a
                href={`/${area?.Location}`}
                key={area?.Title}
                target="_blank"
                rel="noopener noreferrer"
                className="relative rounded-xl overflow-hidden bg-primary hover:opacity-90 "
              >
                <img
                  src={area?.["Social Image"]}
                  className="h-64 w-full object-cover hover:scale-110 transition-all"
                />
                <div
                  style={{ height: "50%" }}
                  className="from-white opacity-50 to-black bg-gradient-to-b bottom-0 absolute z-10"
                />
                <h2 className="absolute bottom-0 left-0 mx-4 my-4 text-white z-20 font-medium text-xl">
                  {area?.Title}
                </h2>
              </a>
            ) : (
              <Link href={`/${area?.Location}`} key={area?.Title}>
                <a className="relative rounded-xl overflow-hidden bg-primary hover:opacity-90 ">
                  <img
                    src={area?.["Social Image"]}
                    className="h-64 w-full object-cover hover:scale-110 transition-all"
                  />
                  <div
                    style={{ height: "50%" }}
                    className="from-white opacity-50 to-black bg-gradient-to-b bottom-0 absolute z-10"
                  />
                  <h2 className="absolute bottom-0 left-0 mx-4 my-4 text-white z-20 font-medium text-xl">
                    {area?.Title}
                  </h2>
                </a>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const promises = [generalAPI("Grid view"), contentAPI("Grid view")];

  const [areas, content] = await Promise.allSettled(promises);

  return {
    props: {
      areas:
        areas.status === "fulfilled" ? areas.value?.map((ar) => ar.fields) : [],
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

export default Home;
