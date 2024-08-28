import type { Metadata } from "next";
import { fetchAPI } from "./utils/fetch-api";
import { FALLBACK_SEO } from "./utils/constants";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./globals.css";
import { Libre_Franklin, Caveat, Sorts_Mill_Goudy } from "next/font/google";

// main font
export const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-libre-franklin",
});

// headers
export const sortsMillGoudy = Sorts_Mill_Goudy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sorts-mill-goudy",
});

// special texts, quotes, etc.
export const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

async function getGlobal(): Promise<any> {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/global`;
    const urlParamsObject = {
      populate: {
        metadata: {
          populate: "*",
        },
        navbar: {
          populate: "*",
        },
        footer: {
          populate: "*",
        },
      },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };

    const responseData = await fetchAPI(path, urlParamsObject, options);
    return responseData;
  } catch (error) {
    console.error(error);
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobal();
  if (!global.data) return FALLBACK_SEO;

  const { metadata } = global.data.attributes;

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TODO - funky error page?
  const global = await getGlobal();
  // if (!global.data) return null;
  const {
    title: navTitle,
    image: navImage,
    links: navLinks,
  } = global.data.attributes.navbar;
  const { footer } = global.data.attributes;

  return (
    <html
      lang="pl"
      className={`${libreFranklin.variable} ${sortsMillGoudy.variable} ${caveat.variable}`}
    >
      <body>
        <div className="flex flex-col min-h-screen relative z-10 bg-background2">
          <Navbar title={navTitle} image={navImage} links={navLinks} />
          <div className="z-0 my-auto">{children}</div>
        </div>
        <Footer {...footer} />
      </body>
    </html>
  );
}
