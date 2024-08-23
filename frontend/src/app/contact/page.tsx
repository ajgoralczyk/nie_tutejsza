import ContactWithImage, {
  ContactWithImageType,
} from "../components/ContactWithImage";
import { fetchAPI } from "../utils/fetch-api";

async function getContact(): Promise<any> {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/contact`;
    const urlParamsObject = {
      populate: "*",
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };

    const responseData = await fetchAPI(path, urlParamsObject, options);
    return responseData.data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Contact() {
  const data = await getContact();
  console.log("contact page data", data);

  return (
    <ContactWithImage
      image={data?.attributes?.image}
      description={data?.attributes?.description || ""}
      type={ContactWithImageType.ImageLeft}
    />
  );
}
