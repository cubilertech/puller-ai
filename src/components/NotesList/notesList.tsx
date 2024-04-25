"use client";
import { Box } from "@mui/material";
import { Paper } from "../Paper";
import { SingleCardDomyData } from "@/utils/constants";
import SimpleCard from "../SimpleCard/simpleCard";
import { useRouter } from "next/navigation";

const NotesList = () => {
  const route = useRouter();

  const handleOpenNotes = () => {
    route.push("/request/recent");
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
        type="light-border"
        sx={{
          padding: 2,
          width: "100%",
          borderRadius: "8px",
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
            {/* <CustomLink href="/request/preview"> */}
            <SimpleCard
              isFor="Results"
              title={item.title}
              discription={item.discription}
            />
            {/* </CustomLink> */}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default NotesList;
