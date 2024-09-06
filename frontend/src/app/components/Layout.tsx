import React from "react";

type LayoutProps = {
  header?: React.ReactNode;
  content: React.ReactNode;
};

export default async function Layout({ header, content }: LayoutProps) {
  return (
    <>
      {header}
      <div className="px-4 xl:px-6 py-6 xl:py-10 max-w-screen-xl mx-auto">
        <main className="flex flex-col gap-6 xl:gap-10">{content}</main>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  return [];
}
