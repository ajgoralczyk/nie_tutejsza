import { useSearchParams } from "next/navigation";
import { fetchAPI } from "../../utils/fetch-api";

async function fetchPosts() {
  try {
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/articles`;
    const urlParamsObject = {
      sort: { createdAt: "desc" },
      populate: "*",
      pagination: {
        page: currentPage,
      },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const response = await fetchAPI(path, urlParamsObject, options);
    console.log("response", response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export default async function MostRecentCard() {
  const global = await fetchPosts();

  return <div className="flex flex-col gap-4 xl:gap-6 items-center"></div>;
}
