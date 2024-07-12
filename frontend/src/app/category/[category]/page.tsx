import ArticleListItem from "@/app/components/ArticleListItem";
import Header from "@/app/components/Header";
import { fetchAPI } from "@/app/utils/fetch-api";

type CategoryProps = {
  params: {
    category: string;
  };
};

async function fetchPostsByCategory(filter: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/articles`;
    const urlParamsObject = {
      sort: { createdAt: "desc" },
      filters: {
        categories: {
          slug: filter,
        },
      },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const response = await fetchAPI(path, urlParamsObject, options);

    return response?.data;
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

  const { name, description, cover } = category[0].attributes;
  console.log('posts', posts);

  // if (data.length === 0) return <div>Not Posts In this category</div>;

  // const { name, description } = data[0]?.attributes.category.data.attributes;

  return (
    <>
      <Header title={name} description={description} />
      <section>
        {/* <div>{JSON.stringify(posts)}</div> */}
        <div className="mx-auto grid items-start gap-8 p-6 md:p-8 lg:p-10">
          {posts.map(post => <ArticleListItem href={post.attributes.slug} title={post.attributes.title} description={post.attributes.description}/>)}
        </div>
      </section>
    </>
  );
}

export async function generateStaticParams() {
  return [];
}
