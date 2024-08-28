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
      <div className="px-4 lg:px-6 py-6 lg:py-10 max-w-screen-lg mx-auto flex flex-col lg:flex-row gap-6 lg:gap-10">
        <main className="flex-grow basis-3/4 flex flex-col gap-4 lg:gap-6">
          {content}
        </main>
        <div className="flex-grow basis-1/4">{side}</div>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  return [];
}
