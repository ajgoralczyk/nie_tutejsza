import Link from "next/link"

type LinkType = {
  url: string,
  text: string,
};

type NavbarProps = {
  title: string,
  image?: string,
  links: LinkType[],
};

export default function Navbar(props: NavbarProps) {
  const { title, image, links } = props;
  
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-background">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        {/* image or logo */}
        {title}
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {links && links.map(link => (
          <Link href={link.url} key={link.url} className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            {link.text}
          </Link>
        ))}
    </nav>
  </header>
  );
}
