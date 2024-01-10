import Link from "next/link";

export const AlternativeAuthMethodLink = ({ description, href, linkText }: { description: string; href: string | URL; linkText: string; }) => {
  return (
    <div className="ml-2 text-xs block">
      <span className="font-normal">{description}</span>
      <Link
        href={href}
        className="text-purple-500 font-semibold hover:text-purple-600"
      >
        {" "}
        {linkText}
      </Link>
    </div>
  );
};
