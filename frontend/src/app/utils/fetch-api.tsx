import qs from "qs";
import { getStrapiURL } from "./api-helpers";

export async function fetchAPI(
  path: string,
  urlParamsObject = {},
  options = {}
) {
  try {
    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: 60 }, // TODO what is it for?
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };
    const defaultPagination = {
      'pagination[pageSize]': 10,
    };

    // Build request URL
    const queryString = qs.stringify({...defaultPagination, ...urlParamsObject});
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error(error);
    throw new Error(`Please check if your server is running and you set all the required tokens.`);
  }
}
