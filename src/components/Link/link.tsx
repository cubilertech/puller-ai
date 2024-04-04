import { FC, ReactNode } from "react";
import Link from "next/link";

interface CustomLinkProps {
    href: string;
    children: ReactNode; 
}

const CustomLink: FC<CustomLinkProps> = ({ href, children, ...props }) => {
    return (
        <Link href={href} {...props} style={{color: "#54A6FF"}}>
            {children}
        </Link>
    );
};

export default CustomLink;
