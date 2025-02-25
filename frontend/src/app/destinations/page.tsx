"use client";
import { fetchAPI } from "../utils/fetch-api";
import { Map, MapTypes } from "../components/map/Map";
import LayoutWithSidePanel from "../components/LayoutWithSidePanel";
import AboutMeCard from "../components/sideCards/AboutMeCard";
import ArticleList from "../components/ArticleList";

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

async function getDestinations(): Promise<any> {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/destination`;
    const urlParamsObject = {
      populate: "*",
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };

    const responseData = await fetchAPI(path, urlParamsObject, options);
    return responseData;
  } catch (error) {
    console.error(error);
  }
}

export default async function Destinations() {
  const categories = await fetchCategories();
  const destinations = await getDestinations();

  const availableWorldCategories = categories.filter(
    (category) =>
      category?.attributes?.worldCategory !== null &&
      category?.attributes?.articles?.data?.length > 0
  );
  const availableUsaCategories = categories.filter(
    (category) =>
      category?.attributes?.usaCategory !== null &&
      category?.attributes?.articles?.data?.length > 0
  );

  return (
    <LayoutWithSidePanel
      content={
        <section className="">
          <h3>Podróże</h3>
          <p>{destinations?.data?.attributes?.description}</p>
          <p>Stany, o których mam coś do powiedzienia</p>
          <div className="px-4 xl:px-6">
            <Map
              onSelect={(value) => {
                console.log("clicked", value);
              }}
              selectableRegions={availableUsaCategories.map(
                (category) => category.attributes.usaCategory
              )}
              type={MapTypes.Usa}
              id="usaMap"
            />
          </div>
          <p>I kraje</p>
          <div className="px-4 xl:px-6">
            <Map
              onSelect={(value) => {
                console.log("clicked", value);
              }}
              selectableRegions={availableWorldCategories.map(
                (category) => category.attributes.worldCategory
              )}
              type={MapTypes.World}
              id="worldMap"
            />
          </div>
        </section>
      }
      side={
        <>
          <AboutMeCard />
          {/* <p>instagram</p> */}
          <h4 className="">Najnowsze</h4>
          <ArticleList
            pageSize={3}
            isSideComponent={true}
            withPagination={false}
          />
        </>
      }
    />
  );
}
