"use client";
import { replaceBrandName } from "@/utils/common";
import { LatestPullesCard } from "../Latestpulles-Card";
import { FC } from "react";
import { motion } from "framer-motion";

interface Props {
  index: number;
  item: any;
  handleLatestPrompt: (val: string) => void;
}
export const PromptList: FC<Props> = ({ item, handleLatestPrompt, index }) => {
  const companyName = localStorage.getItem("companyName");
  const replaceBrand = replaceBrandName(
    { description: item.message },
    companyName as string
  );
  return (
    <motion.div
      key={`motion-div-${index}`}
      animate={{ opacity: [0, 1] }}
      transition={{
        duration: index === 0 ? 0.5 : index,
        ease: "easeInOut",
      }}
    >
      <LatestPullesCard
        key={index}
        query={replaceBrand}
        onClick={() => handleLatestPrompt(item.message as string)}
      />
    </motion.div>
  );
};
