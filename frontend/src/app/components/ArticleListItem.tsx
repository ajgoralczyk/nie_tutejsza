import Link from "next/link";
import Image, { ImageData } from "./Image";

type ArticleListItemProps = {
  href: string,
  title: string,
  description: string,
  image?: ImageData,
  publishedAt: string,
  categories: any,
}

export default function ArticleListItem(props: ArticleListItemProps ) {
  const { href, title, description, image} = props; 
  const date = new Date(props.publishedAt).toLocaleDateString('pl-PL');
  // TODO filter out current category
  // TODO make it a link 
  console.log('ArticleListItem', props.categories.data);

  return (
    <div className="group bg-background2 border border-lightGrey flex flex-row"> {/* href={`/articles/${href}`} */}
      <div className="w-2/5">
        {image && image.data ?
          <Image file={image} className="aspect-[3/2] overflow-hidden rounded-l-xl object-cover"/>
          : null
        }
      </div>
      <div className=" w-3/5 p-6 lg:p-8">
        <div className="text-xs flex gap-3 pb-2">
          {props.categories.data.map(category => <Link href={`/category/${category.attributes.slug}`} className="hover:underline">{category.attributes.name}</Link>)}
        </div>
        <h3 className="text-lg font-bold group-hover:underline">{title}</h3>
        <p className="text-xs  pb-3">{date}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}