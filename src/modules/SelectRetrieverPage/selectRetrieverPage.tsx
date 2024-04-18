import { PageHeader } from "@/components/PageHeader";
import RetriverCard from "@/components/RetriverCard/retriverCard";
import { Box } from "@mui/material";

const data = [
  {
    icon: "snowflake",
    status: "needPermissions",
    title: "snowflake 1",
    description:
      "Retrievers 1 bot will help to gether Retrievers 1 bot will help to gether in...",
  },
  {
    icon: "snowflake",
    status: "needPermissions",
    title: "snowflake 3",
    description:
      "Retrievers 1 bot will help to gether Retrievers 1 bot will help to gether in...",
  },
  {
    icon: "segment",
    status: "needPermissions",
    title: "Segment",
    description:
      "Retrievers 1 bot will help to gether Retrievers 1 bot will help to gether in...",
  },
  {
    icon: "lytics",
    status: "needPermissions",
    title: "Lytics",
    description:
      "Retrievers 1 bot will help to gether Retrievers 1 bot will help to gether in...",
  },
  {
    icon: "dataRoom",
    status: "needPermissions",
    title: "Data room 1",
    description:
      "Retrievers 1 bot will help to gether Retrievers 1 bot will help to gether in...",
  },
  {
    icon: "snowflake",
    status: "needPermissions",
    title: "snowflake 2",
    description:
      "Retrievers 1 bot will help to gether Retrievers 1 bot will help to gether in...",
  },
  {
    icon: "dbtCore",
    status: "needPermissions",
    title: "dbt Core",
    description:
      "Retrievers 1 bot will help to gether Retrievers 1 bot will help to gether in...",
  },
  {
    icon: "sfCrm",
    status: "needPermissions",
    title: "SF CRM",
    description:
      "Retrievers 1 bot will help to gether Retrievers 1 bot will help to gether in...",
  },
  {
    icon: "clReport",
    status: "needPermissions",
    title: "Cl Report 23",
    description:
      "Retrievers 1 bot will help to gether Retrievers 1 bot will help to gether in...",
  },
  {
    icon: "nielsen",
    status: "needPermissions",
    title: "Nielsen",
    description:
      "Retrievers 1 bot will help to gether Retrievers 1 bot will help to gether in...",
  },
  {
    icon: "googleAnalytics",
    status: "needPermissions",
    title: "Google Analytics",
    description:
      "Retrievers 1 bot will help to gether Retrievers 1 bot will help to gether in...",
  },
  {
    icon: "clickstream",
    status: "needPermissions",
    title: "clickstream",
    description:
      "Retrievers 1 bot will help to gether Retrievers 1 bot will help to gether in...",
  },
  {
    icon: "clickstream",
    status: "needPermissions",
    title: "PowerBI Link",
    description:
      "Retrievers 1 bot will help to gether Retrievers 1 bot will help to gether in...",
  },
  {
    icon: "clickstream",
    status: "needPermissions",
    title: "IRI Panel",
    description:
      "Retrievers 1 bot will help to gether Retrievers 1 bot will help to gether in...",
  },
  {
    icon: "clickstream",
    status: "needPermissions",
    title: "Transact POS",
    description:
      "Retrievers 1 bot will help to gether Retrievers 1 bot will help to gether in...",
  },
];

const SelectRetrieverPage = () => {
  return (
    <Box
      sx={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        height: "calc(100vh - 130px)",
      }}
    >
      <PageHeader type="Select Retriver" />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, 210px)",
          alignItems: "flex-start",
          justifyItems: "center",
          width: "100%",
          height: "fit-content",
          gap: "2rem",
          justifyContent: "space-evenly",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          "-ms-overflow-style": "none",
        }}
      >
        {data.map((card, i) => (
          <RetriverCard
            description={card.description}
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
