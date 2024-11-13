"use client";
import { Box } from "@mui/material";
import { CSSProperties, FC, useEffect, useState } from "react";
import "./style.css";
import { Paper } from "@/components/Paper";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import { format } from "sql-formatter";
import { replaceBrandName } from "@/utils/common";
import { useGetClientInfo } from "@/hooks/useMeta";

interface SQL_EditorProps {
  handleClose?: () => void | undefined;
  code: string;
}
type type_lang =
  | "bigquery"
  | "db2"
  | "db2i"
  | "hive"
  | "mariadb"
  | "mysql"
  | "n1ql"
  | "plsql"
  | "postgresql"
  | "redshift"
  | "singlestoredb"
  | "snowflake"
  | "spark"
  | "sql"
  | "sqlite"
  | "tidb"
  | "transactsql"
  | "trino"
  | "tsql"
  | undefined;

const SQL_Editor: FC<SQL_EditorProps> = ({ handleClose, code }) => {
  const [formattedCode, setFormattedCode] = useState<string>("");
  const companyName = localStorage.getItem("companyName");
  const { data } = useGetClientInfo();
  useEffect(() => {
    if (code && data?.connection) {
      setFormattedCode(
        format(
          replaceBrandName(
            { description: code as string },
            companyName as string,
            true
          ),
          { language: data.connection.type as type_lang }
        )
      );
    }
  }, [code, data]);
  const customCoyStyle = {
    ...coy,
    'code[class*="language-"]': {
      ...coy['code[class*="language-"]'],
      background: "transparent",
      color: "white",
      padding: 0,
      fontSize: "16px",
      scrollbarWidth: "none" as CSSProperties["scrollbarWidth"],
      width: "100%",
      height: "100%",
    },
    'pre[class*="language-"]': {
      ...coy['code[class*="language-"]'],
      background: "transparent",
      color: "white",
      padding: 0,
      fontSize: "16px",
      scrollbarWidth: "none" as CSSProperties["scrollbarWidth"],
      width: "100%",
      height: "100%",
    },
    'span[class="token"]': {
      ...coy['span[class="token"]'],
      background: "transparent",
      fontSize: "16px !important",
    },
  };
  return (
    <Paper
      variant="dark-border"
      sx={{
        height: "100%",
        padding: 3,
        overflow: "hidden",
        width: "100%",
        m: 0,
      }}
    >
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
          mb: 0.8,
        }}
      >
        <Typography variant="display-xs-medium">SQL Editor</Typography>
       
      </Box>
      <Divider variant="fullWidth" type="light" /> */}
      <Box
        sx={{
          width: "100%",
          mt: 1,
          height: "calc(100vh  - 354px)",
        }}
      >
        {/* Display formatted code with line numbers   */}
        <SyntaxHighlighter
          language="sql"
          style={customCoyStyle}
          showLineNumbers
        >
          {formattedCode}
        </SyntaxHighlighter>
      </Box>
    </Paper>
  );
};

export default SQL_Editor;
