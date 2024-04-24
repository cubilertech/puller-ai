import { PageHeader } from "@/components/PageHeader";
import RetriverCard from "@/components/RetriverCard/retriverCard";
import SimpleCard from "@/components/SimpleCard/simpleCard";
import { Box } from "@mui/material";

const data = [
  {
    icon: "snowflake",
    status: "live",
    title: "snowflake 1",
    description:
      "Retrievers 1 bot will help to gether Retrievers 1 bot will help to gether in...",
  },
  {
    icon: "snowflake",
    status: "live",
    title: "snowflake 3",
    description:
      "Retrievers 1 bot will help to gether Retrievers 1 bot will help to gether in...",
  },
  {
    icon: "segment",
    status: "live",
    title: "Segment",
    description:
      "Retrievers 1 bot will help to gether Retrievers 1 bot will help to gether in...",
  },
  {
    icon: "lytics",
    status: "live",
    title: "Lytics",
    description:
      "Retrievers 1 bot will help to gether Retrievers 1 bot will help to gether in...",
  },
  {
    icon: "dataRoom",
    status: "live",
    title: "Data room 1",
    description:
      "Retrievers 1 bot will help to gether Retrievers 1 bot will help to gether in...",
  },
  {
    icon: "snowflake",
    status: "live",
    title: "snowflake 2",
    description:
      "Retrievers 1 bot will help to gether Retrievers 1 bot will help to gether in...",
  },
  {
    icon: "dbtCore",
    status: "live",
    title: "dbt Core",
    description:
      "Retrievers 1 bot will help to gether Retrievers 1 bot will help to gether in...",
  },
  {
    icon: "sfCrm",
    status: "issues",
    title: "SF CRM",
    description:
      "Retrievers 1 bot will help to gether Retrievers 1 bot will help to gether in...",
  },
  {
    icon: "clReport",
    status: "issues",
    title: "Cl Report 23",
    description:
      "Retrievers 1 bot will help to gether Retrievers 1 bot will help to gether in...",
  },
  {
    icon: "nielsen",
    status: "issues",
    title: "Nielsen",
    description:
      "Retrievers 1 bot will help to gether Retrievers 1 bot will help to gether in...",
  },
  {
    icon: "googleAnalytics",
    status: "issues",
    title: "Google Analytics",
    description:
      "Retrievers 1 bot will help to gether Retrievers 1 bot will help to gether in...",
  },
  {
    icon: "clickstream",
    status: "blocked",
    title: "clickstream",
    description:
      "Retrievers 1 bot will help to gether Retrievers 1 bot will help to gether in...",
  },
  {
    icon: "clickstream",
    status: "blocked",
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

const RetrieversPage = () => {
  return (
    <Box
      sx={{
        padding: "1.2rem",
        pb: 0,
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
        height: "100%",
      }}
    >
      <PageHeader type="Retrivers" />
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

export default RetrieversPage;
