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
  id: string;
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

export type ButtonVariants = "outlined" | "contained" | "text";

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

export type PaperVariants = "light-border" | "dark-border" | "light-bg-border";

export type RectangleCardIcons = "connectApps" | "apiKey" | "upload" | "cpu";

export type TooltipVariants = "info" | "status";

export type FeedbackPageVariants = "retriever" | "alert";

// export type RootState = {
//   sqlEditor: ReturnType<typeof sqlEditorReducer>;
// };
export interface submitPromptPayload {
  message: string;
}

export interface Prompt {
  description: string;
  graph: Graph[];
  id: string;
  sql: string;
  target: string;
  variables: Variable[];
  query?: string;
  observations?: string;
  notes?:Array<string>;
  columns?:Array<string>;
  rows?:Array<any>;
  results?: any[];
}

export type PromptsList = {
  [key: string]: Prompt;
};

export interface submitExecutePayload {
  prompt: string;
}

export interface Query {
  id: string;
  status: string;
  results: any[];
}

export interface Client {
  connection: {
    dataset: string;
    project: string;
    status: true;
    type: string;
  };
  name: string;
}

export interface submitValidatePayload {
  prompt: string;
  variables?: Variable[];
}

export type Graph = {
  depends: any[];
  description: string;
  id: string;
  name: string;
};

export interface CustomNodeData {
  value?: number;
  label: string;
}

export interface Variable {
  id: string;
  model: string;
  name: string;
  type: string;
  value: number;
  a?: string;
  c?: string;
  e?: string;
  g?: string;
  i?: string;
  k?: string;
  m?: string;
}
export enum Position {
  Left = "left",
  Top = "top",
  Right = "right",
  Bottom = "bottom",
}
export interface LatestPullesCardDataProps {
  text: string;
}

export type Retriever = {
  icon: string;
  status: string;
  title: string;
  description: string;
  timestamp: number;
  files: [
    {
      description: string;
      url?: string;
    },
  ];
};

export type App = {
  id?: string;
  image: string;
  name: string;
  isConnected: boolean;
};

export interface appUpdatePayload {
  id: string;
  status: boolean;
}

export type Files = {
  description: string;
  file: File;
};

export interface createRetrieverPayload {
  status: StatusTypes;
  title: string;
  files: Files[];
  description: string;
  timestamp: number;
}
