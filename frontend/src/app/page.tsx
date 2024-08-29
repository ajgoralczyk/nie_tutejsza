import AboutMeCard from "./components/AboutMeCard";
import LayoutWithSidePanel from "./components/LayoutWithSidePanel";
export default function Home() {
  return (
    <LayoutWithSidePanel
      content={<p className="bg-black">--main page--</p>}
      side={
        <>
          <AboutMeCard />
          <p>instagram</p>
        </>
      }
    />
  );
}
