import { PageHeader } from "@/components/PageHeader";
import { RetriverCard } from "@/components/RetriverCard";
import { RETRIEVER_DATA } from "@/utils/data";
import { Box } from "@mui/material";

const RetrieversPage = () => {
  return (
    <Box
      sx={{
        padding: "1.2rem 1rem",
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
        height: "100%",
      }}
    >
      <PageHeader variant="Retrivers" />
      {/* Grid Layout */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, 210px)",
          alignItems: "flex-start",
          justifyItems: "center",
          width: "100%",
          height: "fit-content",
          gap: "1rem",
          justifyContent: "space-between",
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        {RETRIEVER_DATA.map((card, i) => (
          <RetriverCard
            description={card.description}
            icon={card.icon}
            status={card.status}
            title={card.title}
            key={i}
          />
        ))}
      </Box>
    </Box>
  );
};

export default RetrieversPage;
