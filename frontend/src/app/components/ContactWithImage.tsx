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
  console.log("image", image);

  return (
    <section
      className={`p-4 lg:p-6 max-w-screen-lg mx-auto flex flex-col gap-8 lg:gap-12 ${
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
