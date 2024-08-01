import Markdown from "react-markdown";
import Image from "./Image";
import remarkGfm from "remark-gfm";

export enum TextWithImageType {
  ImageLeft,
  ImageRight,
}

export type TextWithImageProps = {
  image: any,
  type: TextWithImageType,
  content: any,
};

export default function TextWithImage({image, type, content}: TextWithImageProps) {

  const ImageWrapper = (
    <div className="w-1/2">
      <Image className="" file={image} />
    </div>
  );

  return (
    <section className={`p-4 lg:p-6 max-w-screen-lg mx-auto flex flex-row gap-8 lg:gap-12`}>
      {type === TextWithImageType.ImageLeft && ImageWrapper}
      <div className="w-1/2 ">
        <Markdown children={content} remarkPlugins={[remarkGfm]} />
      </div>
      {type === TextWithImageType.ImageRight && ImageWrapper}
    </section>
  );
}
