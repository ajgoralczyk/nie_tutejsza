import TextWithImage, { TextWithImageType } from "../components/TextWithImage";
import { fetchAPI } from "../utils/fetch-api";

async function fetchPage(filter: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/pages`;
    const urlParamsObject = {
      filters: {
        slug: filter,
      },
      populate: {
        content: { populate: '*' },
      }
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const response = await fetchAPI(path, urlParamsObject, options);

    return response?.data;
  } catch (error) {
    console.error(error);
  }
}

export default async function About() {
  const pageData = await fetchPage('about');
  const { content } = pageData[0].attributes;
  console.log('pageData', pageData, content);

  return (
    <>
      {content.map(block => (
        <TextWithImage 
          image={block.image}
          type={block.type === "ImageRight" ? TextWithImageType.ImageRight : TextWithImageType.ImageLeft}
          content={block.text}
        />
      ))}
    </>
    
  );
}
