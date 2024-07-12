import Link from "next/link";

type ArticleListItemProps = {
  title: string,
  description: string,
  image?: string,
  creationDate?: string,
}

export default function ArticleListItem(props: ArticleListItemProps ) {
  const { title, description, image, creationDate} = props; 
  console.log('ArticleListItem', title, description);
  return (
    <Link href="#" className="group bg-background2 border-yellow flex flex-row" prefetch={false}>
      <div className="w-2/5" >
        <img
          src="/placeholder.svg"
          alt="Featured Post 1"
          className="aspect-[3/2] overflow-hidden rounded-xl object-cover"
        />
      </div>
      <div className="p-6 md:p-8 lg:p-10">
        <h3 className="text-lg font-bold group-hover:underline">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </Link>
  );
}