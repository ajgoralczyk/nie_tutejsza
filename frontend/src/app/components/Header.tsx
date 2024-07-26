import Image, { ImageData } from "./Image";
type HeaderProps = {
  description?: string,
  image?: ImageData,
  title: string,
}

export default function Header(props: HeaderProps) {
  const { description, image, title } = props;
  console.log('header image', image);

  return (
    <section className="bg-background w-full relative overflow-hidden">
      {image && image.data ? (
        <Image file={image} className="aspect-[2/1] object-cover"/>
      ) : (
        // TODO what to show when there is no image for category?
        <div className="h-72 overflow-hidden">
          <p className="text-[400px] text-yellow opacity-30 h-full -translate-y-1/2">{title}</p>
        </div>
      )}
      {/* TODO check calculation, something is working incorrectly */}
      <div className="bg-background2 w-[calc(50%+504px)] lg:pl-[calc(50%-512px)] lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:rounded-tr-xl">
        <div className="p-4 lg:p-6">
          <h1 className="font-bold text-secondary text-3xl sm:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="text-sm sm:text-base">
              {description}
            </p>
          )}
        </div>
      </div>

    </section>
  );
}
