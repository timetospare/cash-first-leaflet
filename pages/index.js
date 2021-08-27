import Head from "next/head";
import Link from "next/link";
import generalAPI from "./api/general";

const Home = ({ areas }) => {
  return (
    <div className="min-h-screen py-2">
      <Head>
        <title>Cash First Leaflet</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="w-full max-w-6xl mx-auto px-2">
        <h1 className="text-3xl my-6 font-medium">
          IFAN - Cash First Leaflets
        </h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
          {areas.map((area) => (
            <Link href={`/${area?.Location}`}>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const areas = await generalAPI("Grid view");

  return {
    props: {
      areas: areas?.map((ar) => ar.fields) || [],
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 100, // In seconds
  };
}

export default Home;
