import { fetchAPI } from '@/app/utils/fetch-api';

async function fetchPosts() {
    try {
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        const path = `/articles`;
        const urlParamsObject = {
            sort: { createdAt: 'desc' },
            populate: {
                cover: { fields: ['url'] },
            },
        };
        const options = { headers: { Authorization: `Bearer ${token}` } };
        const responseData = await fetchAPI(path, urlParamsObject, options);
        return responseData;
    } catch (error) {
        console.error(error);
    }
}

export default async function BlogRoute() {
    const { data } = await fetchPosts();

    //TODO: CREATE A COMPONENT FOR THIS
    if (data?.length === 0) return <div>Not Posts Yes</div>;

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
