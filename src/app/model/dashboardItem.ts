import {Type} from "@angular/core";

export interface IDashboardItem {
  component: Type<any>;
  title: string;
  rowStart: number;
  rowEnd: number;
  colStart: number;
  colEnd: number;
}
