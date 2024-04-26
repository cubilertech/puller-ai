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
