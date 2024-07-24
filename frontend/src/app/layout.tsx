import type { Metadata } from "next";
import { fetchAPI } from "./utils/fetch-api";
import "./globals.css";
import { FALLBACK_SEO } from "./utils/constants";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

async function getGlobal(): Promise<any> {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/global`;
    const urlParamsObject = {
      populate: {
        metadata: {
            populate: '*',
        },
        navbar: {
            populate: '*',
        },
        footer: {
          populate: '*',
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

export async function  generateMetadata(): Promise<Metadata> {
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
  const { title: navTitle, image: navImage, links: navLinks } = global.data.attributes.navbar;
  const { footer } = global.data.attributes;
  console.log('!!!', global.data.attributes.navbar);

  return (
    <html lang="pl">
      <body className=""> {/* flex flex-col h-screen justify-between bg-background2 */}
        <div className="flex flex-col min-h-screen relative z-10 bg-background2">
          <Navbar title={navTitle} image={navImage} links={navLinks} />
          {children}
        </div>
        <Footer {...footer} />
      </body>
    </html>
  );
}
