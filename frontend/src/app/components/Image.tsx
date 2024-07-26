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
}

type ImageProps = {
  file: ImageData,
  className: string,
}

export default function Image(props: ImageProps ) {
  const imgUrl = getStrapiMedia(props.file.data.attributes.url);

  return (
    <div className={props.className}> {/* flex items-center justify-center mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 */}
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