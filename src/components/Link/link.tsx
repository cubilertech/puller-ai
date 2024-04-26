import { CSSProperties, FC, ReactNode } from "react";
import Link from "next/link";

interface CustomLinkProps {
  href: string;
  children: ReactNode;
  variant?: "border" | "simple";
  style?: CSSProperties;
}

const CustomLink: FC<CustomLinkProps> = ({
  href,
  children,
  variant = "simple",
  style,
  ...props
}) => {
  switch (variant) {
    case "simple":
      return (
        <Link href={href} {...props} style={{ ...style, color: "#54A6FF" }}>
          {children}
        </Link>
      );
    case "border":
      return (
        <Link
          href={href}
          {...props}
          style={{
            ...style,
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
