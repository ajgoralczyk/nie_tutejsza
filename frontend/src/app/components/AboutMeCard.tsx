import { describe } from "node:test";
import { fetchAPI } from "../utils/fetch-api";
import Image from "./Image";
import Link from "next/link";

async function getGlobal(): Promise<any> {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/global`;
    const urlParamsObject = {
      populate: {
        aboutMe: {
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

export default async function AboutMeCard() {
  const global = await getGlobal();
  const { aboutMe } = global?.data?.attributes;

  return (
    <div className="flex flex-col gap-4 lg:gap-6 items-center">
      <Image file={aboutMe.image} className="rounded-full overflow-hidden" />
      <div>
        <h4 className="text-center">o mnie</h4>
        <p className="text-sm text-center">{aboutMe.description}</p>
      </div>
      <Link href="/about">
        <button className="bg-black text-background rounded-xl px-6 py-2">
          więcej
        </button>
      </Link>
    </div>
  );
}
