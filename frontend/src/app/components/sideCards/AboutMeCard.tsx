import { fetchAPI } from "../../utils/fetch-api";
import Image from "../Image";
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
    <div className="flex xl:flex-col gap-6 xl:gap-6 items-center">
      <Image file={aboutMe.image} className="rounded-full overflow-hidden" />
      <div className="flex flex-col gap-4 xl:gap-6 items-center">
        <div>
          <h4 className="xl:text-center">o mnie</h4>
          <p className="text-sm xl:text-center">{aboutMe.description}</p>
        </div>
        <Link href="/about">
          <button className="bg-black text-background rounded-xl px-6 py-2">
            więcej
          </button>
        </Link>
      </div>
    </div>
  );
}
