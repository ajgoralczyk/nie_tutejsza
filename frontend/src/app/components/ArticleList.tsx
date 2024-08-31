"use client";

import { fetchAPI } from "@/app/utils/fetch-api";
import { useSearchParams } from "next/navigation";
import ArticleListItem from "@/app/components/ArticleListItem";
import Pagination from "@/app/components/Pagination";
import Link from "next/link";

type ArticleListProps = {
  category?: string;
  withPagination?: boolean;
  pageSize?: number;
  isSideComponent?: boolean;
  skipElement?: number; // ID
};

type fetchPostsProps = {
  category?: string;
  search?: string;
  page?: number;
  pageSize: number;
};

// TODO split fetching and state management into separate components?
async function fetchPosts({
  category,
  search,
  pageSize,
  page = 1,
}: fetchPostsProps) {
  try {
    const filters = {};
    if (category) {
      filters.categories = {
        slug: category,
      };
    }
    if (search) {
      filters.$or = [
        {
          title: {
            $containsi: search,
          },
        },
        {
          description: {
            $containsi: search,
          },
        },
        {
          text: {
            body: {
              $containsi: search,
            },
          },
        },
      ];
    }

    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/articles`;
    const urlParamsObject = {
      sort: { createdAt: "desc" },
      filters: filters,
      populate: "*",
      pagination: {
        page: page,
        pageSize: pageSize,
      },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const response = await fetchAPI(path, urlParamsObject, options);

    return response;
  } catch (error) {
    console.error(error);
  }
}

export default async function ArticleList({
  category,
  withPagination = true,
  pageSize = 10,
  isSideComponent = false,
  skipElement,
}: ArticleListProps) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || undefined;
  const search = searchParams.get("search") || undefined;

  const posts = await fetchPosts({ category, search, pageSize, page });
  const pageCount = posts?.meta?.pagination?.pageCount;

  // TODO add --no articles version--

  // TODO recheck order (are really newest at the beginning?)
  return (
    <>
      {posts?.data?.map((post) => (
        <ArticleListItem
          href={post.attributes.slug}
          image={post.attributes.cover}
          title={post.attributes.title}
          description={post.attributes.description}
          publishedAt={post.attributes.publishedAt}
          categories={post.attributes.categories}
          key={post.id}
          isSideComponent={isSideComponent}
        />
      ))}
      {withPagination && <Pagination pageCount={pageCount} />}
      {!withPagination && (
        <div className="mx-auto">
          <Link href="/articles">
            <button className="bg-black text-background rounded-xl px-6 py-2">
              więcej
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
