"use client";
import { fetchAPI } from "../utils/fetch-api";
import { Map, MapTypes } from "../components/map/Map";

async function fetchCategories() {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/categories`;
    const urlParamsObject = {
      populate: "*",
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const response = await fetchAPI(path, urlParamsObject, options);

    return response?.data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Destinations() {
  const categories = await fetchCategories();
  console.log("categories", categories);

  return (
    <section className="p-4 lg:p-6 max-w-screen-lg mx-auto">
      <Map
        onSelect={(value) => {
          console.log("clicked", value);
        }}
        selectableRegions={["CA", "PL", "US"]}
        type={MapTypes.World}
        id="worldMap"
      />
      Second map
      <Map
        onSelect={(value) => {
          console.log("clicked", value);
        }}
        selectableRegions={["CA", "NY", "NJ"]}
        type={MapTypes.Usa}
        id="usaMap"
      />
    </section>
  );
}
