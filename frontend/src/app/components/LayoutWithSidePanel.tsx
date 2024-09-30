import React from "react";

type LayoutWithSidePanelProps = {
  header?: React.ReactNode;
  content: React.ReactNode;
  side: React.ReactNode;
};

export default async function LayoutWithSidePanel({
  header,
  content,
  side,
}: LayoutWithSidePanelProps) {
  return (
    <>
      {header}
      <div className="px-4 xl:px-6 py-6 xl:py-10 max-w-screen-xl mx-auto flex flex-col xl:flex-row gap-6 xl:gap-10">
        <main className="flex-grow basis-3/4 flex flex-col gap-4 xl:gap-6">
          {content}
        </main>
        <div className="flex-grow basis-1/4 flex flex-col gap-4 xl:gap-6 items-center">
          {side}
        </div>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  return [];
}
