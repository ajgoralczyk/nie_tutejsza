import Link from "next/link"

type NavbarProps = {

};

export default function Navbar() {
  
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-background2">
      <Link href="#" className="flex items-center justify-center" prefetch={false}>
        {/* image or logo */}
        <span className="sr-only">Blog</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Destinations
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Travel Tips
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          About
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Contact
        </Link>
    </nav>
  </header>
  );
}
