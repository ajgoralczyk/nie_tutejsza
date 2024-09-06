import AboutMeCard from "../components/sideCards/AboutMeCard";
import ArticleList from "../components/ArticleList";
import LayoutWithSidePanel from "../components/LayoutWithSidePanel";

export default async function BlogRoute() {
  return (
    <LayoutWithSidePanel
      content={
        <>
          {/* TODO add header with image & "Wszystkie wpisy" */}
          <ArticleList />
        </>
      }
      side={
        <>
          <AboutMeCard />
          {/* <p>instagram</p> */}
        </>
      }
    />
  );
}
