"use client";

import { fetchAPI } from "@/app/utils/fetch-api";
import { useSearchParams } from "next/navigation";
import ArticleListItem from "../components/ArticleListItem";
import Pagination from "../components/Pagination";

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

export default async function BlogRoute() {
  const posts = await fetchPosts();

  //TODO: CREATE A COMPONENT FOR THIS
  if (posts?.length === 0) return <div>Not Posts Yes</div>;

  return (
    <LayoutWithSidePanel
      content={
        <>
          {/* TODO add header with image & "Wszystkie wpisy" */}
          {posts?.data.map((post) => (
            <ArticleListItem
              href={post.attributes.slug}
              image={post.attributes.cover}
              title={post.attributes.title}
              description={post.attributes.description}
              publishedAt={post.attributes.publishedAt}
              categories={post.attributes.categories}
              key={post.id}
            />
          ))}
          <Pagination pageCount={posts.meta.pagination.pageCount} />
        </>
      }
      side={
        <>
          <p>o mnie</p>
          <p>instagram</p>
        </>
      }
    />
  );
}
