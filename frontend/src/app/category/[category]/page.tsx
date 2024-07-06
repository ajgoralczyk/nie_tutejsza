import { fetchAPI } from '@/app/utils/fetch-api';

type CategoryProps = {
  params: {
    category: string,
  }
}

async function fetchPostsByCategory(filter: string) {
    try {
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        const path = `/articles`;
        const urlParamsObject = {
            sort: { createdAt: 'desc' },
            filters: {
                categories: {
                    slug: filter,
                },
            },
        };
        const options = { headers: { Authorization: `Bearer ${token}` } };
        const responseData = await fetchAPI(path, urlParamsObject, options);
        console.log('responseData', responseData);
        return responseData;
    } catch (error) {
        console.error(error);
    }
}

export default async function CategoryRoute({ params }: CategoryProps) {
    const filter = params.category;
    const { data } = await fetchPostsByCategory(filter);

    // if (data.length === 0) return <div>Not Posts In this category</div>;

    // const { name, description } = data[0]?.attributes.category.data.attributes;

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    );
}

export async function generateStaticParams() {
    return [];
}
