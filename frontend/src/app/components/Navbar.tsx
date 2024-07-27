"use client"

import Link from "next/link"
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

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
  const [open, setOpen] = useState(false);

  function toggleNavigation() {
    setOpen(open => !open);
  }
  
  return (
    <header className="p-4 lg:px-6 flex items-center bg-background sticky top-0 left-0 right-0 z-20">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        {/* image or logo */}
        {title}
      </Link>

      <nav className="hidden sm:flex ml-auto gap-4">
        {links && links.map(link => (
          <Link href={link.url} key={link.url} className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            {link.text}
          </Link>
        ))}
      </nav>

      <div className="flex sm:hidden ml-auto w-100">
        <RxHamburgerMenu onClick={toggleNavigation}/>
      </div>

      <div className={`flex sm:hidden flex-col w-3/4 top-0 right-0 fixed p-4 gap-4 bg-background z-20 h-dvh t-0 duration-200 transform ${open ? '' : 'translate-x-full'}`}>
        <div className="text-lg flex justify-end">
          <IoClose onClick={toggleNavigation}/>
        </div>
        {links && links.map(link => (
          <Link href={link.url} onClick={toggleNavigation} key={link.url} className="text-lg" prefetch={false}>
            {link.text}
          </Link>
        ))}
      </div>
    </header>
  );
}
