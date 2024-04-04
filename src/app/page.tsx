import CustomLink from "@/components/Link/link";
import { Button } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <CustomLink href="/link">
      <p style={{padding: "10px", margin: "100px"}}>Hello wrold</p>
    </CustomLink>
  );
}
