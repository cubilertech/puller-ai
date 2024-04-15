import { FC, ReactNode } from "react";
import Link from "next/link";

interface CustomLinkProps {
  href: string;
  children: ReactNode;
  variant?: "border" | "simple";
}

const CustomLink: FC<CustomLinkProps> = ({
  href,
  children,
  variant = "simple",
  ...props
}) => {
  switch (variant) {
    case "simple":
      return (
        <Link href={href} {...props} style={{ color: "#54A6FF" }}>
          {children}
        </Link>
      );
    case "border":
      return (
        <Link
          href={href}
          {...props}
          style={{
            color: "#54A6FF",
            borderBottom: "1px solid #54A6FF",
            lineHeight: "10px",
          }}
        >
          {children}
        </Link>
      );
  }
};

export default CustomLink;
