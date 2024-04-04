import CustomLink from "@/components/Link/link";
import { palette } from "@/theme/Palette";
import { Button, Typography } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <CustomLink href="/link">
      <p style={{ padding: "10px", margin: "100px" }}>Hello wrold</p>
    </CustomLink>
  );
}
