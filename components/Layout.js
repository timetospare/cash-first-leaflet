export const Layout = ({ children }) => {
  return (
    <div className="w-full h-screen flex flex-col">
      <header className="w-full p-2 flex flex-row justify-between border-b items-center">
        <img src="/logo.webp" className="h-8 w-auto"></img>
        <a href="#">About</a>
      </header>
      <main className="w-full h-full">{children}</main>
      <footer className="w-full flex flex-row justify-end border-t p-2">
        <div>
          Powered by <span className="font-pacifico">TimetoSpare</span>
        </div>
      </footer>
    </div>
  );
};
