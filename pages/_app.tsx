import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import Image from "next/image";
import { NavBar, SideBar } from "../components";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const [isSsr, setIsSsr] = useState(true);
  useEffect(() => {
    setIsSsr(false);
  }, []);
  if (isSsr) return null;
  return (
    <GoogleOAuthProvider
      clientId={`648381144953-h6qifg5ikjp1trga95475kgh3vk2hsb5.apps.googleusercontent.com`}
    >
      <Head>
        <title>TikTik</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <div className="w-full flex flex-col h-screen overflow-y-auto">
        <div className="w-full z-40 sticky top-0 bg-white">
          <NavBar />
        </div>

        <div className=" px-5 md:px-20 gap-4 flex flex-auto w-full overflow-y-auto">
          <SideBar />
          <div className="flex-auto h-full overflow-y-auto">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
