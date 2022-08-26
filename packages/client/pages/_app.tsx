import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  const { authenticated } = pageProps;
  return (
    <div className="App flex flex-col min-h-screen text-gray-600">
      <Header authenticated={authenticated} />
      <div className="flex-1 max-w-3xl w-full mx-auto">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}

export default MyApp;
