import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { PULLS_TYPES } from "@/utils/constants";
import { Input } from "../Input";

interface TemplateTopbarProps {
  isActive: string;
  setIsActive: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setSearch: (val: string) => void;
}

const TemplateTopbar: FC<TemplateTopbarProps> = ({
  isActive,
  setIsActive,
  search,
  setSearch,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        mb: "1.2rem",
        height: "8%",
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          onClick={() => setIsActive(PULLS_TYPES.PULLS)}
          sx={{
            width: "202px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            ":hover": {
              cursor: "pointer",
            },
          }}
        >
          <Typography variant="text-md-regular">Pulls</Typography>
          {isActive === PULLS_TYPES.PULLS && (
            <Box
              sx={{
                background:
                  "linear-gradient(to right, #AD00FE -140.78%, #00E0EE)",
                height: "1px",
                width: "100%",
                mt: "5px",
              }}
            />
          )}
        </Box>

        <Box
          onClick={() => setIsActive(PULLS_TYPES.PROMPTS)}
          sx={{
            textAlign: "center",
            width: "202px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            ":hover": {
              cursor: "pointer",
            },
          }}
        >
          <Typography variant="text-md-regular">Requests</Typography>

          <Box
            sx={{
              background:
                isActive === PULLS_TYPES.PROMPTS
                  ? "linear-gradient(to right, #AD00FE -140.78%, #00E0EE)"
                  : "transparent",
              height: "1px",
              width: "100%",
              mt: "5px",
            }}
          />
        </Box>
      </Box>

      <Input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search..."
        icon="search"
        width={230}
        height={40}
      />
    </Box>
  );
};

export default TemplateTopbar;
