import { PageHeader } from "@/components/PageHeader";
import RetriverCard from "@/components/RetriverCard/retriverCard";
import { Selcect_RetrieverData } from "@/utils/constants";
import { Box } from "@mui/material";

const SelectRetrieverPage = () => {
  return (
    <Box
      sx={{
        padding: "2rem 1rem 0 ",
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
        height: "100%",
      }}
    >
      <PageHeader type="Select Retriver" />

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
        {Selcect_RetrieverData.map((card, i) => (
          <RetriverCard
            description={card.description}
            // icon={card.icon && card.icon}
            icon={
              card.icon === "snowflake"
                ? "snowflake"
                : card.icon === "segment"
                  ? "segment"
                  : card.icon === "lytics"
                    ? "lytics"
                    : card.icon === "dataRoom"
                      ? "dataRoom"
                      : card.icon === "dbtCore"
                        ? "dbtCore"
                        : card.icon === "sfCrm"
                          ? "sfCrm"
                          : card.icon === "clReport"
                            ? "clReport"
                            : card.icon === "nielsen"
                              ? "nielsen"
                              : card.icon === "googleAnalytics"
                                ? "googleAnalytics"
                                : card.icon === "clickstream"
                                  ? "clickstream"
                                  : "snowflake"
            }
            status={
              card.status === "live"
                ? "live"
                : card.status === "blocked"
                  ? "blocked"
                  : card.status === "issues"
                    ? "issues"
                    : card.status === "needPermissions"
                      ? "needPermissions"
                      : "issues"
            }
            title={card.title}
            key={i}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SelectRetrieverPage;
