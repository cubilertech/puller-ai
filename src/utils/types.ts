import { icons } from "./constants";

export type IconTypes = keyof typeof icons;
export interface ActiveTypeProps {
  ALL: "all";
  UNREAD: "unread";
  PUBLIC: "public";
  PRIVATE: "private";
}

export interface CardData {
  main_title: string;
  main_discription: string;
  fileType: string;
  fileSize: string;
  fileStructured: string;
  fileTimestamps: string;
  fileCaveats: string;
  fileCaveatsURL: string;
  sources: string;
  title: string;
  discription: string;
  fileLink: string;
}

export interface UserProps {
  name: string;
  avatar: string;
}

export interface ConnectItem {
  image: string;
  name: string;
  isConnected: boolean;
}

export interface TemplateCardTypes {
  image: string;
  heading: string;
  subHeading: string;
  subHeading2: string;
}

export interface MenuItemType {
  text: string;
  value?: number | string;
}
export enum RetrieverIconsTypes {
  Search = "search",
  Ellipse = "ellipse",
  Snowflake = "snowflake",
  Live = "live",
  Segment = "segment",
  Lytics = "lytics",
  DataRoom = "dataRoom",
  DbtCore = "dbtCore",
  SfCrm = "sfCrm",
  Issues = "issues",
  ClReport = "clReport",
  Nielsen = "nielsen",
  GoogleAnalytics = "googleAnalytics",
  Clickstream = "clickstream",
  CPU = "cpu",
}
export enum StatusTypes {
  live = "live",
  blocked = "blocked",
  issues = "issues",
  needPermissions = "needPermissions",
}

export type DividerVariant = "fullWidth" | "middle" | "inset";

export type CustomButtonVariants =
  | "select"
  | "rounded-SQL"
  | "smallbutton"
  | "round"
  | "request-history";

export type ButtonTextTransforms =
  | "capitalize"
  | "lowercase"
  | "uppercase"
  | "inherit";

export type CustomLinkVariants = "border" | "simple";

export type LoaderVariants = "simple" | "paper" | "pageLoader";

export type LogoVariants = "login" | "default";

export type OptionsBarVariants =
  | "input"
  | "square-checkbox"
  | "round-checkbox"
  | "dropdown"
  | "options-dropdown";

export type PageHeaderVariants =
  | "Recent"
  | "Results"
  | "create"
  | "Validate"
  | "Preview"
  | "Template"
  | "Retrivers"
  | "New Retriver"
  | "Select Retriver"
  | "Alerts"
  | "Create Alert"
  | "Connect App"
  | "Custom Retrievers"
  | "Retriever Detail"
  | "Advanced";

export type PaperVariants =
  | "light-border"
  | "dark-border"
  | "light-bg-border"
  | "light-border-2"
  | "dark-border-2";

export type RectangleCardIcons = "connectApps" | "apiKey" | "upload" | "cpu";

export type TooltipVariants = "info" | "status";

export type FeedbackPageVariants = "retriever" | "alert";

// export type RootState = {
//   sqlEditor: ReturnType<typeof sqlEditorReducer>;
// };
export interface validateRequestPayload {
  message: string;
}

export interface runQueryPayload {
  prompt: string;
}

export interface validateRequestResponse {
  description: string;
  graph: any[]; // Replace 'any' with the actual type of 'graph' if known
  id: string;
  sql: string;
  target: string;
  variables: any[]; // Replace 'any' with the actual type of 'variables' if known
}

export interface runQueryResponse {
  id: string;
  status: string;
}

export interface queryStatusResponse {
  id: string;
  result: string;
  status: string;
}
