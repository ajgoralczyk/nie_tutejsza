import Image, { ImageData } from "./Image";
import Link from "./Link";
type HeaderProps = {
  description?: string;
  image?: ImageData;
  title: string;
  categories?: any;
  publishedAt?: string;
  updatedAt?: string;
};

export default function Header(props: HeaderProps) {
  const { description, image, title, categories, publishedAt, updatedAt } =
    props;

  return (
    <section className="bg-background w-full relative overflow-hidden">
      {image && image.data ? (
        <Image file={image} className="aspect-[2/1] object-cover" />
      ) : (
        // TODO what to show when there is no image for category?
        <div className="h-72 overflow-hidden">
          <p className="text-[400px] text-yellow opacity-30 h-full -translate-y-1/2">
            {title}
          </p>
        </div>
      )}
      {/* TODO check calculation, something is working incorrectly */}
      <div className="bg-background2 xl:w-[calc(50%+630px)] xl:pl-[calc(50%-640px)] xl:absolute xl:bottom-0 xl:left-0 xl:right-0 xl:rounded-tr-xl">
        <div className="px-4 xl:px-6 pt-4 xl:pt-6">
          {categories && (
            <div className="text-xs flex flex-none gap-3 uppercase py-2">
              {categories.data.map((category) => (
                <Link
                  url={`/category/${category.attributes.slug}`}
                  className="hover:underline"
                  key={category.attributes.slug}
                >
                  {category.attributes.name}
                </Link>
              ))}
            </div>
          )}
          <h1 className="font-bold text-secondary text-3xl sm:text-4xl font-header">
            {title}
          </h1>
          {publishedAt && (
            <p className="pt-2 text-sm">
              {new Date(publishedAt).toLocaleString("pl-PL")}
              {updatedAt &&
                `, ostatnio uaktualniony: ${new Date(updatedAt).toLocaleString(
                  "pl-PL"
                )}`}
            </p>
          )}
          {description && <p className="text-sm sm:text-base">{description}</p>}
        </div>
      </div>
    </section>
  );
}
