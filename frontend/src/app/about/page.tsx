import Layout from "../components/Layout";
import TextWithImage, { TextWithImageType } from "../components/TextWithImage";
import { fetchAPI } from "../utils/fetch-api";

async function getAbout(): Promise<any> {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/about`;
    const urlParamsObject = {
      populate: {
        content: {
          populate: "*",
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

export default async function About() {
  const pageData = await getAbout();
  const { content } = pageData?.attributes;

  return (
    <Layout
      content={
        <>
          {content.map((block) => (
            <TextWithImage
              image={block.image}
              type={
                block.type === "ImageRight"
                  ? TextWithImageType.ImageRight
                  : TextWithImageType.ImageLeft
              }
              content={block.text}
            />
          ))}
        </>
      }
    />
  );
}
