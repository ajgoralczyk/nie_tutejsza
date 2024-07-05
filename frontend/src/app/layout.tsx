import type { Metadata } from "next";
import { fetchAPI } from "./utils/fetch-api";
import "./globals.css";
import { FALLBACK_SEO } from "./utils/constants";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

async function getGlobal(): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  // TODO - create error messages and tests
  if (!token) throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global`;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const urlParamsObject = {
    populate: [
      "metadata",
    ],
  };
  return await fetchAPI(path, urlParamsObject, options);
}

export async function  generateMetadata(): Promise<Metadata> {
  const meta = await getGlobal();

  if (!meta.data) return FALLBACK_SEO;

  const { metadata } = meta.data.attributes;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // TODO - funky error page?
  const global = await getGlobal();
  console.log(global);
  // if (!global.data) return null;

  return (
    <html lang="pl">
      <Navbar />
      <body>{children}</body>
      <Footer />
    </html>
  );
}
