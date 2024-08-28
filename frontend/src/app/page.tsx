import LayoutWithSidePanel from "./components/LayoutWithSidePanel";
export default function Home() {
  return (
    <LayoutWithSidePanel
      content={<p className="bg-black">--main page--</p>}
      side={<div className="bg-yellow flex-grow basis-1/4">--side--</div>}
    />
  );
}
