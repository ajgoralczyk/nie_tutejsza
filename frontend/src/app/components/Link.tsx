import { default as NextLink } from "next/link";


export type LinkProps = {
  children?: React.ReactNode | string,
  url: string,
}

export default function Link(props: LinkProps) {
  const { children, url } = props;
  return (
    <NextLink href={url} className="text-sm hover:text-foreground" prefetch={false}>
      {children}
    </NextLink>
  );
}
