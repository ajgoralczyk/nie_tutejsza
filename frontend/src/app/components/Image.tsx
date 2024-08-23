import { getStrapiMedia } from "../utils/api-helpers";
import { default as NextImage } from "next/image";

export type ImageData = {
  data: {
    id: string;
    attributes: {
      url: string;
      name: string;
      alternativeText: string;
    };
  };
};

type ImageProps = {
  file: ImageData;
  className: string;
};

export default function Image(props: ImageProps) {
  console.log("Image", props.file);
  const imgUrl = getStrapiMedia(props.file.data.attributes.url);

  return (
    <div className={props.className}>
      <NextImage
        src={imgUrl || ""}
        alt={props.file.data.attributes.alternativeText || "none provided"}
        className="object-cover w-full h-full overflow-hidden"
        width={400}
        height={400}
      />
    </div>
  );
}
