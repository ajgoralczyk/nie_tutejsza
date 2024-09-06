import AboutMeCard from "@/app/components/sideCards/AboutMeCard";
import Author from "@/app/components/Author";
import Header from "@/app/components/Header";
import LayoutWithSidePanel from "@/app/components/LayoutWithSidePanel";
import RichText from "@/app/components/RichText";
import { fetchAPI } from "@/app/utils/fetch-api";
import ArticleList from "@/app/components/ArticleList";

type ArticleProps = {
  params: {
    slug: string;
  };
};

async function fetchPost(slug: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/articles`;
    const urlParamsObject = {
      filters: { slug },
      populate: "*",
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchAPI(path, urlParamsObject, options);

    return responseData;
  } catch (error) {
    console.error(error);
  }
}

export default async function ArticleRoute({ params }: ArticleProps) {
  const { data } = await fetchPost(params.slug);
  const { cover, title, updatedAt, publishedAt, categories, text, authors } =
    data[0].attributes;

  return (
    <>
      <LayoutWithSidePanel
        header={
          <Header
            title={title}
            image={cover}
            categories={categories}
            updatedAt={updatedAt}
            publishedAt={publishedAt}
          />
        }
        content={
          <section>
            <RichText data={text.body} />
            {authors && <Author authors={authors} />}
          </section>
        }
        side={
          <div>
            <AboutMeCard />
            {/* <p>instagram</p> */}
            <h4 className="">Najnowsze</h4>
            <ArticleList
              pageSize={3}
              isSideComponent={true}
              withPagination={false}
              skipElement=""
            />
          </div>
        }
      />
    </>
  );
}

export async function generateStaticParams() {
  return [];
}
