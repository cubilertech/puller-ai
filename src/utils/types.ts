import { PagesType, icons } from "./constants";

export type IconTypes = keyof typeof icons;

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
