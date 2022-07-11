import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const NUMBERS_RANDOM = 15;
const baseLink = process.env.NEXT_PUBLIC_BASE_URL;

const Home: NextPage = () => {
  const [generatedLink, setGeneratedLink] = useState("");
  const [url, setUrl] = useState("");
  const [baseLink, setBaseLink] = useState("");

  useEffect(() => {
    if (window) {
      setBaseLink(window.location.host);
    }
  }, []);

  const generateCustomSlug = async () => {
    if (url.trim() === "" || !url.includes("http")) {
      alert("Insert a valid url");
      return;
    }
    const validSlug = getCustomSlug();
    setGeneratedLink(validSlug);
    await saveSlugToDB(validSlug);
  };
  const saveSlugToDB = async (slug: string) => {
    await fetch("/api/save-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, url }),
    });
  };
  /*const getValidSlug = async (): Promise<string> => {
    const customSlug = getCustomSlug();
    const existSlugInDatabase = await (
      await fetch(`/api/get-url/${customSlug}`)
    ).json();
    if (existSlugInDatabase.url) return await getValidSlug();
    return customSlug;
  };*/
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${baseLink}/${generatedLink}`);
    alert(`Copied the text: https://${baseLink}/${generatedLink}`);
  };

  const getCustomSlug = () => {
    let randomID = "";
    for (let i = 0; i < NUMBERS_RANDOM; i++) {
      randomID += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
    }
    return randomID;
  };

  return (
    <div>
      <Head>
        <title>Link Shortener</title>
      </Head>
      <div className="bg-slate-900 flex flex-col space-y-4 justify-center items-center text-2xl h-screen px-3">
        <div className="w-full space-y-4" style={{ maxWidth: "600px" }}>
          <h3 className="text-4xl font-bold text-white text-center">
            Link Shortener
          </h3>
          <div className="flex items-center space-x-2 w-full justify-center">
            <input
              className="border-gray-600 focus:border-gray-400 text-white bg-slate-800 w-4/5 p-3 border-2 rounded-lg focus:shadow-lg outline-0"
              placeholder="https://google.com"
              type="text"
              value={url}
              onChange={({ target: { value } }) => setUrl(value)}
            />
            <button
              className="text-white w-1/5 bg-indigo-600 hover:bg-indigo-500 flex justify-center rounded-lg py-3 font-semibold shadow-lg"
              onClick={generateCustomSlug}
            >
              Shorten
            </button>
          </div>
          {generatedLink.trim() !== "" && (
            <div className="flex items-center justify-center space-x-2 w-full justify-center">
              <div className="flex items-center space-x-4">
                <p className="text-white w-full">
                  https://{baseLink}/{generatedLink}
                </p>
              </div>
              <button
                className="w-1/12 bg-indigo-600 hover:bg-indigo-500 flex justify-center rounded-lg py-3 shadow-lg"
                onClick={generateCustomSlug}
              >
                <Image
                  src="/retry.svg"
                  alt="retry icon"
                  width={36}
                  height={32}
                />
              </button>
              <button
                className="w-1/12 bg-indigo-600 hover:bg-indigo-500 flex justify-center rounded-lg py-3 shadow-lg"
                onClick={copyToClipboard}
              >
                <Image
                  src="/clipboard.svg"
                  alt="clipboard icon"
                  width={36}
                  height={32}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
