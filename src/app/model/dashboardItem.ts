export class DashboardItem {
  constructor(rs: number, cs: number, re: number, ce: number, title: string) {
    this.title = title;
    this.rowStart = rs;
    this.rowEnd = re;
    this.colEnd = ce;
    this.colStart = cs;
  }

  title: string = "";
  rowStart: number = 0;
  rowEnd: number = 0;
  colStart: number = 0;
  colEnd: number = 0;
}
