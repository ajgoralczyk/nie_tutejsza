import IconLink, { IconLinkProps } from "./IconLink";
import Link, { LinkProps } from "./Link";

type LinkType = {
  text: string;
  url: string;
};

export type FooterProps = {
  title: string;
  description?: string;
  iconLinks: IconLinkProps[];
  linksTitle: string;
  links: LinkType[];
};

export default function Footer(props: FooterProps) {
  const { title, description, iconLinks, linksTitle, links } = props;

  return (
    <footer className="bg-background py-4 xl:px-6 text-primary sticky right-0 bottom-0 left-0 w-full box-border">
      <div className="container mx-auto grid gap-4 sm:gap-8 sm:grid-cols-2 px-4 pb-4 xl:px-6 xl:pb-6 max-w-screen-xl">
        <div className="flex flex-col items-start gap-4">
          <Link url="/" className="text-sm hover:text-foreground">
            <h3 className="text-lg font-semibold">{title}</h3>
          </Link>
          <p className="text-sm">{description}</p>
          <div className="flex flex-row gap-x-2 text-xl">
            {iconLinks &&
              iconLinks.map((link: IconLinkProps) => (
                <IconLink url={link.url} icon={link.icon} key={link.url} />
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">{linksTitle}</h3>
          {/* TODO: fix */}
          <div className="grid grid-cols-1 gap-2 grid-cols-2">
            {links &&
              links.map((link: LinkType) => (
                <Link url={link.url} children={link.text} key={link.url} />
              ))}
          </div>
        </div>
      </div>

      <div className="border-t pt-4 xl:pt-6 text-center text-sm border-border">
        &copy; 2024 Ag. All rights reserved.
      </div>
    </footer>
  );
}
