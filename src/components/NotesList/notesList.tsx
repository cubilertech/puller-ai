"use client";
import { Box } from "@mui/material";
import { Paper } from "../Paper";
import { useRouter } from "next/navigation";
import { SingleCardDomyData } from "@/utils/data";
import { RequestsCard } from "../RecentRequestes-Card";
import { CustomLink } from "../Link";
import { AlertModal } from "@/modals/AlertModal";
import { CURRENT_MODE, MODES } from "@/utils/constants";
import { useState } from "react";

const NotesList = () => {
  const route = useRouter();
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const handleOpenNotes = () => {
    if (CURRENT_MODE === MODES.PILOT) {
      setIsOpenAlert(true);
    } else route.push("/request/recent");
  };
  const handleCard = () => {
    if (CURRENT_MODE === MODES.PILOT) {
      setIsOpenAlert(true);
    } else route.push("/request/preview");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "20%",
        height: "calc(100vh - 205px)",
      }}
    >
      <Paper
        onClick={() => handleOpenNotes()}
        variant="light-border"
        sx={{
          padding: 2,
          width: "100%",
          borderRadius: "4px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        Puller AI Notes
      </Paper>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: "column",
          height: "100%",
          overflowY: "auto",
          scrollbarWidth: "none",
          mt: 2,
        }}
      >
        {SingleCardDomyData.map((item, i) => (
          <Box mr={-10} width={"100%"} key={i}>
            <RequestsCard
              title={item.title}
              discription={item.discription}
              onClick={() => handleCard()}
            />
          </Box>
        ))}
      </Box>
      <AlertModal
        open={isOpenAlert}
        handleClose={() => setIsOpenAlert(false)}
      />
    </Box>
  );
};

export default NotesList;
