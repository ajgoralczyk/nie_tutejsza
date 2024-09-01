"use client";

import { fetchAPI } from "@/app/utils/fetch-api";
import { useSearchParams } from "next/navigation";
import Header from "@/app/components/Header";
import LayoutWithSidePanel from "@/app/components/LayoutWithSidePanel";
import AboutMeCard from "@/app/components/sideCards/AboutMeCard";
import ArticleList from "@/app/components/ArticleList";

type CategoryProps = {
  params: {
    category: string;
  };
};

async function fetchCategory(filter: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/categories`;
    const urlParamsObject = {
      filters: {
        slug: filter,
      },
      populate: "*",
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const response = await fetchAPI(path, urlParamsObject, options);

    return response?.data;
  } catch (error) {
    console.error(error);
  }
}

export default async function CategoryRoute({ params }: CategoryProps) {
  const filter = params.category;
  const category = await fetchCategory(filter);

  // TODO do I need just one api call? update populate

  const { name, description, cover } = category[0].attributes;

  // TODO if (data.length === 0) return <div>Not Posts In this category</div>;

  // TODO const { name, description } = data[0]?.attributes.category.data.attributes;

  return (
    <LayoutWithSidePanel
      header={<Header title={name} description={description} image={cover} />}
      content={<ArticleList category={filter} />}
      side={
        <>
          <AboutMeCard />
          <p>instagram</p>
          <h4 className="">Najnowsze</h4>
          <ArticleList
            pageSize={3}
            isSideComponent={true}
            withPagination={false}
          />
        </>
      }
    />
  );
}
