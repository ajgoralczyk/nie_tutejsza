import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type RichTextProps = {
  data: string;
};

export default function RichText({ data }: RichTextProps) {
  // console.log(data);
  // TODO add styles
  return (
    <section className="">
      <Markdown children={data} remarkPlugins={[remarkGfm]} />
    </section>
  );
}
