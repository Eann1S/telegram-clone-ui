import Link from "next/link";

export const AlternativeAuthMethodLink = ({ description, href, children }: { description: string; href: string | URL; children: string }) => {
  return (
    <div className="ml-2 text-xs block">
      <span className="text-muted-foreground font-normal">{description}</span>
      <Link
        href={href}
        className="text-primary font-semibold hover:text-primary-foreground"
      >
        {" "}
        {children}
      </Link>
    </div>
  );
};
