'use client'

import ArticleListItem from "@/app/components/ArticleListItem";
import Header from "@/app/components/Header";
import Pagination from "@/app/components/Pagination";
import { fetchAPI } from "@/app/utils/fetch-api";
import { useSearchParams } from "next/navigation";

type CategoryProps = {
  params: {
    category: string;
    page?: number;
  };
};

async function fetchPostsByCategory(filter: string) {
  try {
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/articles`;
    const urlParamsObject = {
      sort: { createdAt: "desc" },
      filters: {
        categories: {
          slug: filter,
        },
      },
      populate: '*',
      pagination: {
        page: currentPage,
      },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const response = await fetchAPI(path, urlParamsObject, options);

    return response;
  } catch (error) {
    console.error(error);
  }
}

async function fetchCategory(filter: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/categories`;
    const urlParamsObject = {
      filters: {
        slug: filter,
      },
      populate: '*'
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
  const posts = await fetchPostsByCategory(filter);
  const category = await fetchCategory(filter);
  console.log('posts', posts);

  // TODO do I need just one api call? update populate

  const { name, description, cover } = category[0].attributes;

  // TODO if (data.length === 0) return <div>Not Posts In this category</div>;

  // TODO const { name, description } = data[0]?.attributes.category.data.attributes;

  return (
    <>
      <Header title={name} description={description} image={cover} />
      <section className="mx-auto grid items-start gap-6 p-4 lg:p-6 max-w-screen-lg">
        {posts?.data.map(post => 
          <ArticleListItem 
            href={post.attributes.slug}
            image={post.attributes.cover}
            title={post.attributes.title}
            description={post.attributes.description}
            publishedAt={post.attributes.publishedAt}
            categories={post.attributes.categories}
            key={post.id}
          />
        )}
      </section>
      <Pagination pageCount={posts.meta.pagination.pageCount} />
    </>
  );
}
