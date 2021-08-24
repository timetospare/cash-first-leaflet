import Head from "next/head";

export const Layout = ({ children }) => {
  return (
    <div className="w-full h-screen flex flex-col p-0">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico"
          rel="stylesheet"
        />
      </Head>
      <header className="w-full p-2 flex flex-row justify-between border-b items-center">
        <a
          href="https://www.foodaidnetwork.org.uk/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img src="/logo.webp" className="h-8 w-auto"></img>
        </a>
        <a
          href="https://www.foodaidnetwork.org.uk/cash-first-leaflets"
          rel="noopener noreferrer"
          target="_blank"
        >
          About
        </a>
      </header>
      <main className="w-full h-full overflow-auto">{children}</main>
    </div>
  );
};
