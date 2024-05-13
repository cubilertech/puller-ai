import { palette } from "@/theme/Palette";
import { Box, Typography } from "@mui/material";
import { Divider } from "../Divider";
import { Button } from "../Button";
import { FC } from "react";
import { Paper } from "../Paper";
import { CustomLink } from "../Link";

interface ResponseAreaProps {
  content: {
    response: string;
    original: string;
  };
  handleUpdate?: () => void;
  variables?: boolean;
}

const ResponseArea: FC<ResponseAreaProps> = ({
  content,
  handleUpdate,
  variables,
}) => {
  return (
    <>
      <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
        <Box display={"flex"}>
          {/* <Typography
                      variant={"display-xs"}
                      sx={{
                        width: "98%",
                        pr: 5,
                        pt: 1,
                        m: "auto",
                        textAlign: "start",
                        color: isOpenSelectBar
                          ? palette.opacity.lightGray
                          : palette.base.white,
                      }}
                      component="p"
                    >
                      The data request will give you transaction level data
                      (from the
                      <Tooltip
                        variant="info"
                        title="Seasonal Transactions"
                        description="“TXN_SZNAL” table . This query uses a table called Transactions that contains the following columns:"
                      >
                        <Typography
                          variant={"display-xs"}
                          onClick={handleOpenSelectBar}
                          sx={{
                            borderRadius: "8px",
                            bgcolor: isOpenSelectBar ? palette.base.white : "",
                            color: isOpenSelectBar
                              ? palette.color.midnightPlum
                              : "",
                            mx: "5px",
                            pb: "3px",
                            pr: "4px",
                            ":hover": {
                              backgroundColor: palette.color.gray[600],
                            },
                          }}
                        >
                          {variable}
                        </Typography>
                      </Tooltip>
                      ) for the past 52 weeks, ending March 15, 2024, grouped by
                      week and by Store ID. It only covers product SKUs that
                      include Flyease technology, which is determined from INT
                      DB for Product ID values 1234 and 5678
                    </Typography> */}
          <Typography
            variant={"display-xs-response"}
            sx={{
              width: "98%",
              pr: 5,
              pt: 1,
              m: "auto",
              textAlign: "start",
              color: palette.base.white,
            }}
            component="p"
          >
            {content.response}
          </Typography>
        </Box>

        <Box pt={2} pb={1}>
          <Divider type="dark" variant="fullWidth" />
        </Box>
        <Box
          sx={{
            width: "98%",
            m: "auto",
            display: "flex",
            justifyContent: "space-between",
            p: 1,
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 3,
              alignItems: "center",
              width: "80%",
            }}
          >
            <Typography variant="text-xs-bold">Original</Typography>
            <Typography
              variant="text-xs-regular"
              color={palette.color.gray[300]}
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }}
            >
              {content.original}
            </Typography>
          </Box>
          <Box sx={{ width: "122px" }}>
            <Button
              sx={{
                width: "122px",
                height: "38px !important",
              }}
              onClick={handleUpdate}
              label="Run Query"
              variant="contained"
            />
          </Box>
        </Box>
      </Box>
      {variables && (
        <Paper
          variant="dark-border"
          sx={{
            borderRadius: "10px",
            height: "56px",
            padding: "0.6rem",
            margin: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            animation: "fallingEffect 0.5s ease forwards",
            position: "relative",
            top: "-500px",
            zIndex: 10,
            opacity: 0,
          }}
        >
          <Typography variant="text-sm" color={palette.color.gray[300]}>
            This query is estimated to take X minutes and will be approximately
            X size.
            <span style={{ textDecoration: "underline" }}>
              <CustomLink color="#90919b" variant="simple" href="#">
                Need to optimize?
              </CustomLink>
            </span>
          </Typography>
        </Paper>
      )}
    </>
  );
};
export default ResponseArea;
