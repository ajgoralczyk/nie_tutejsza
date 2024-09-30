import Link from "./Link";
import Image, { ImageData } from "./Image";

type ArticleListItemProps = {
  href: string;
  title: string;
  description: string;
  image?: ImageData;
  publishedAt: string;
  categories: any;
  isSideComponent: boolean;
};

export default function ArticleListItem(props: ArticleListItemProps) {
  const { href, title, description, image, isSideComponent } = props;
  const date = new Date(props.publishedAt).toLocaleDateString("pl-PL");
  // TODO filter out current category
  // TODO make it all a link

  return (
    <section className="grid items-start gap-6 w-full">
      <div
        className={`bg-background2 border border-lightGrey flex flex-col sm:flex-row overflow-hidden rounded-xl ${
          isSideComponent ? "xl:flex-col" : ""
        }`}
      >
        <div className={`sm:w-2/5 ${isSideComponent ? "xl:w-full" : ""}`}>
          {image && image.data ? (
            <Image file={image} className="aspect-[3/2] object-cover" />
          ) : null}
          {/* TODO alternative when the photo is missing? */}
        </div>
        <div
          className={`sm:w-3/5 flex flex-col ${
            isSideComponent ? "xl:w-full" : ""
          }`}
        >
          <div
            className={`text-xs flex flex-none gap-3 px-6 xl:px-8 pt-6 xl:pt-8 pb-2 ${
              isSideComponent ? "xl:px-4 xl:pt-4" : ""
            }`}
          >
            {props.categories.data.map((category) => (
              <Link
                url={`/category/${category.attributes.slug}`}
                className="hover:underline"
                key={category.attributes.slug}
              >
                {category.attributes.name}
              </Link>
            ))}
          </div>
          <Link
            className={`group flex-auto px-6 xl:px-8 pb-6 xl:pb-8 pt-0 ${
              isSideComponent ? "xl:px-4 xl:pb-4" : ""
            }`}
            url={`/articles/${href}`}
          >
            <h3 className="text-lg font-bold group-hover:underline">{title}</h3>
            <p className="text-xs  pb-3">{date}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
