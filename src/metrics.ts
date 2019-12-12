export class Metric {

  public value: number;
  public date: Date;

  constructor(value: number, date: Date) {
    this.value = value;
    this.date = date;
  }
}