export const Layout = ({ children }) => {
  return (
    <div className="w-full h-screen flex flex-col p-0">
      <header className="w-full p-2 flex flex-row justify-between border-b items-center">
        <img src="/logo.webp" className="h-8 w-auto"></img>
        <a href="#">About</a>
      </header>
      <main className="w-full h-full overflow-scroll">{children}</main>
    </div>
  );
};
