import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type RichTextProps = {
  data: any
};

export default function RichText({data} : RichTextProps) {
  // TODO add styles
  return (
    <section className="mx-auto p-4 lg:p-6 max-w-screen-lg">
      <Markdown children={data.body} remarkPlugins={[remarkGfm]} />
    </section>
  );
}
