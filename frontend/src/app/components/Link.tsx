import { default as NextLink } from "next/link";


export type LinkProps = {
  children?: React.ReactNode | string,
  className?: string,
  url: string,
}

export default function Link(props: LinkProps) {
  const { children, className, url } = props;
  return (
    <NextLink href={url} className={className} prefetch={false}>
      {children}
    </NextLink>
  );
}
