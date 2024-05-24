"use client";
import { Box } from "@mui/material";
import { Paper } from "../Paper";
import { useRouter } from "next/navigation";
import { SingleCardDomyData } from "@/utils/data";
import { RequestsCard } from "../RecentRequestes-Card";
import { AlertModal } from "@/modals/AlertModal";
import { isPilotMode } from "@/utils/constants";
import { FC, useState } from "react";
interface NotesListProps {
  List?: string[];
}

const NotesList: FC<NotesListProps> = ({ List }) => {
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const handleOpenNotes = () => {
    if (isPilotMode) {
      setIsOpenAlert(true);
    } else;
  };
  const handleCard = () => {
    if (isPilotMode) {
      setIsOpenAlert(true);
    } else;
  };
  const ListData = List && List.length ? List : SingleCardDomyData;
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
          borderRadius: "5px",
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
        {ListData.map((item, i) => (
          <Box mr={-10} width={"100%"} key={i}>
            <RequestsCard
              text={item}
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
