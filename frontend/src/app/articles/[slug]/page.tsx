import Author from "@/app/components/Author";
import Header from "@/app/components/Header";
import RichText from "@/app/components/RichText";
import { fetchAPI } from '@/app/utils/fetch-api';

type ArticleProps = {
  params: {
    slug: string,
  }
}

async function fetchPost(slug: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/articles`;
    const urlParamsObject = {
      filters: { slug },
      populate: '*'
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchAPI(path, urlParamsObject, options);

    return responseData;
  } catch (error) {
    console.error(error);
  }
}

function renderPost(section: any, index: number) {
  switch (section.__component) {
    case 'components.rich-text':
      return <RichText key={index} data={section} />
    default:
      return null;
  }
}

export default async function ArticleRoute({ params }: ArticleProps) {
  const { data } = await fetchPost(params.slug);
  const { cover, title, updatedAt, publishedAt, categories, blocks, authors } = data[0].attributes;

  return (
    <div>
      {/* {JSON.stringify(data)} */}
      <Header title={title} image={cover} categories={categories} updatedAt={updatedAt} publishedAt={publishedAt} />
      {blocks && blocks.map((block, index) => renderPost(block, index))}
      <Author authors={authors} />
    </div>
  );
}

export async function generateStaticParams() {
  return [];
}
