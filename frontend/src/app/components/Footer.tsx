import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background2 py-6">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 grid-cols-2">
        <div className="flex flex-col items-start gap-4">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <span className="text-xl font-bold">Travel Blog</span>
          </Link>
          <p className="text-muted-foreground">
            Discover the world with our travel blog. Explore new destinations, get travel tips, and share your
            adventures.
          </p>
        </div>
        <div className="grid">
          <h3 className="text-lg font-semibold">Navigation</h3>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground" prefetch={false}>
            About
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground" prefetch={false}>
            Contact
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground" prefetch={false}>
            Privacy Policy
          </Link>
        </div>
      </div>
      <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
        &copy; 2024 Ag. All rights reserved.
      </div>
    </footer>
  );
}
