import Markdown from "react-markdown";
import Image from "./Image";
import remarkGfm from "remark-gfm";

export enum TextWithImageType {
  ImageLeft,
  ImageRight,
}

export type TextWithImageProps = {
  image: any;
  type: TextWithImageType;
  content: any;
};

export default function TextWithImage({
  image,
  type,
  content,
}: TextWithImageProps) {
  return (
    <section
      className={`flex flex-col gap-8 lg:gap-12 ${
        type === TextWithImageType.ImageLeft
          ? "md:flex-row-reverse"
          : "md:flex-row"
      }`}
    >
      <div className="md:w-1/2 my-auto">
        <Markdown children={content} remarkPlugins={[remarkGfm]} />
      </div>
      <div className="md:w-1/2 my-auto">
        <Image className="" file={image} />
      </div>
    </section>
  );
}
