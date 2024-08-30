import AboutMeCard from "./components/sideCards/AboutMeCard";
import LayoutWithSidePanel from "./components/LayoutWithSidePanel";
import ArticleList from "./components/ArticleList";
export default function Home() {
  return (
    <LayoutWithSidePanel
      content={
        <>
          <ArticleList withPagination={false} />
        </>
      }
      side={
        <>
          <AboutMeCard />
          <p>instagram</p>
        </>
      }
    />
  );
}
