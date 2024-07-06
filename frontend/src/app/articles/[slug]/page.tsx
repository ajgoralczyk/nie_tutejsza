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

export default async function ArticleRoute({ params }: ArticleProps) {
  const { data } = await fetchPost(params.slug);

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
}

export async function generateStaticParams() {
  return [];
}
