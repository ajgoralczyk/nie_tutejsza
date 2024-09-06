import Contact from "./Contact";
import Image from "./Image";

export enum ContactWithImageType {
  ImageLeft,
  ImageRight,
}

export type ContactWithImageProps = {
  image: any;
  description: string;
  type: ContactWithImageType;
};

export default function ContactWithImage({
  image,
  description,
  type,
}: ContactWithImageProps) {
  return (
    <section
      className={`flex flex-col gap-8 xl:gap-12 ${
        type === ContactWithImageType.ImageLeft
          ? "md:flex-row-reverse"
          : "md:flex-row"
      }`}
    >
      <div className="md:w-1/2 my-auto">
        <Contact description={description} />
      </div>
      <div className="md:w-1/2 my-auto">
        <Image className="" file={image} />
      </div>
    </section>
  );
}
