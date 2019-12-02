import mysql = require('mysql');

export class Metric {
  public timestamp: string;
  public value: number;

  constructor(ts: string, v: number) {
    this.timestamp = ts;
    this.value = v
  }
}

export class MetricsHandler {
  
  private db: any ;

  constructor(){

  }
    
}
