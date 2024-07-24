import { FaFacebookSquare, FaInstagram } from "react-icons/fa";

export type IconLinkProps = {
  icon: string,
  url: string,
}

function RenderIcon(icon: string) {
  switch (icon) {
    case "facebook":
      return <FaFacebookSquare />;
    case "instagram":
      return <FaInstagram />;
    default:
      return null;
  }
}

export default function IconLink(props: IconLinkProps) {
  const { icon, url } = props;

  return (
    <a target="_blank" href={url} rel="noopener noreferrer">
      {RenderIcon(icon)}
    </a>
  );
}
