"use client";
import { Box, Typography } from "@mui/material";
import { Paper } from "../../components/Paper";
import { Button } from "../../components/Button";
import { FC, useState } from "react";
import { Loader } from "../../components/Loader";
import Divider from "../../components/Divider/divider";
import { palette } from "@/theme/Palette";
import { CreateInputAreaComponent } from "@/components/inputArea";
import { usePathname, useRouter } from "next/navigation";
import CustomLink from "@/components/Link/link";
import { Tooltip } from "@/components/Tooltip";
import { OptionsBar } from "@/components/optionsBar";
import "./panelArea.css";
import { SQL_Editor } from "@/components/sql_Editor";
import { useSelector, useDispatch } from "react-redux";
import { HandleCloseSQL, getSQLEditorOpen } from "@/redux/sqlEditor";

interface PannelAreaProps {
  content?: {
    response: string;
    original: string;
  };
  handleUpdate?: () => void;
}

const PannelArea: FC<PannelAreaProps> = ({ content, handleUpdate }) => {
  const route = useRouter();
  const dispatch = useDispatch();
  const isSQLEditorOpen = useSelector(getSQLEditorOpen);
  const [isLoading, setisLoading] = useState(false);
  const [isOpenSelectBar, setisOpenSelectBar] = useState(false);

  const routename = usePathname();
  const routeParts = routename.replace(/^\//, "").split("/");
  const isValidate = routeParts.includes("validate");

  const handleAvailable = () => {
    setisLoading(true);
    setTimeout(() => {
      route.push("/request/validate");
    }, 2000);
  };

  const handleOpenSelectBar = () => {
    setisOpenSelectBar(true);
    dispatch(HandleCloseSQL());
  };
  const handleCloseSQL_Editor = () => {
    dispatch(HandleCloseSQL());
  };
  const handleCloseSelectBar = () => {
    setisOpenSelectBar(false);
  };
  const [isTextareaFilled, setIsTextareaFilled] = useState(false);

  const handleTextareaChange = (event: any) => {
    setIsTextareaFilled(event.target.value.trim().length > 0);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        height: "calc(100vh - 200px)",
        width: "100%",
        gap: 2,
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "flex-end",
          flexGrow: "1",
          justifyContent: "space-between",
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"5px"}
          sx={{
            width:
              isOpenSelectBar || isSQLEditorOpen
                ? { lg: "76%", md: "70%", xs: "60%" }
                : "100%",
            height: "100%",
            justifyContent: "flex-end",
            overflowX: "hidden",
            transition: "width 0.5s ease",
          }}
        >
          <Paper
            variant="dark-border"
            sx={{
              border: `1px solid ${palette.color.gray[700]}`,
              height: content ? "fit-content" : "100%",
              margin: 0,
              padding: content ? 1 : 0,
              width: "100%",
            }}
          >
            {isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Loader type="Processing" variant="simple" />
              </Box>
            ) : content ? (
              <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
                <Box>
                  <Box display={"flex"}>
                    <Typography
                      variant={{
                        xl: "display-xs",
                        lg: "text-md-regular",
                        md: "text-sm",
                        sm: "text-xxs-regular",
                      }}
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
                          variant={{
                            xl: "display-xs",
                            lg: "text-md-regular",
                            md: "text-sm",
                            sm: "text-xxs-regular",
                          }}
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
                          {" "}
                          TXN_SZNAL table
                        </Typography>
                      </Tooltip>
                      ) for the past 52 weeks, ending March 15, 2024, grouped by
                      week and by Store ID. It only covers product SKUs that
                      include Flyease technology, which is determined from INT
                      DB for Product ID values 1234 and 5678
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
              </Box>
            ) : (
              ""
            )}
          </Paper>
          {isValidate && (
            <Paper
              variant="dark-border"
              sx={{
                borderRadius: "16px",
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
                This query is estimated to take X minutes and will be
                approximately X size.
                <span style={{ textDecoration: "underline" }}>
                  <CustomLink color="#90919b" variant="simple" href="#">
                    Need to optimize?
                  </CustomLink>
                </span>
              </Typography>
            </Paper>
          )}
        </Box>

        {isOpenSelectBar && (
          <Box className={isOpenSelectBar ? "slide-in" : "slide-out"}>
            <OptionsBar
              close={handleCloseSelectBar}
              variant="square-checkbox"
              handleUpdate={handleUpdate ? () => handleUpdate() : undefined}
            />
          </Box>
        )}
        {isSQLEditorOpen && (
          <Box
            className={isSQLEditorOpen ? "slide-in" : "slide-out"}
            sx={{
              width: { lg: "32%", md: "38%", sm: "40%" },
              height: "100%",
            }}
          >
            <SQL_Editor
              handleClose={() => handleCloseSQL_Editor()}
              code=" SELECT 
            Store_ID, 
            DATE_TRUNC(TXN_DATE, 'week') AS Week, 
            SUM(TXN_AMT) AS Total_Sales
          FROM 
            TXN_SZNAL
          WHERE 
            PROD_ID IN (1234, 5678) AND
      

            PROD_ID IN (1234, 5678) AND
            TXN_DATE >= DATE_ADD(CURRENT_DATE(), INTERVAL) AND
            Store_ID,
            PROD_ID IN (1234, 5678) AND
            TXN_DATE >= DATE_ADD(CURRENT_DATE(), INTERVAL) AND  PROD_ID IN (1234, 5678) AND
            TXN_DATE >= DATE_ADD(CURRENT_DATE(), INTERVAL) AND  PROD_ID IN (1234, 5678) AND
            TXN_DATE >= DATE_ADD(CURRENT_DATE(), INTERVAL) AND  PROD_ID IN (1234, 5678) AND
            TXN_DATE >= DATE_ADD(CURRENT_DATE(), INTERVAL) AND
            Store_ID,
            Store_ID,
            Store_ID,
            Store_ID,

          GROUP BY 
            PROD_ID IN (1234, 5678) AND
            TXN_DATE >= DATE_ADD(CURRENT_DATE(), INTERVAL) AND
            Store_ID, 
            Week
          ORDER BY 
            Week, 
            Store_ID;"
            />
          </Box>
        )}
      </Box>
      {content ? (
        ""
      ) : (
        <CreateInputAreaComponent
          handleValidate={handleAvailable}
          onChangeInput={handleTextareaChange}
          isLoading={isLoading}
          isTextareaFilled={isTextareaFilled}
        />
      )}
    </Box>
  );
};

export default PannelArea;
