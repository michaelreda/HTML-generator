import { Row } from './row';
import { Injectable,EventEmitter } from '@angular/core';

@Injectable()
export class RowsService {
  private i;
  public rows: Row[] = [];
  rowsChanged: EventEmitter<Row[]> = new EventEmitter();
  constructor() { 
    this.i=0;
  }

  public addRow(){
    this.rows.push(new Row())
    this.i++;
    this.rowsChanged.emit(this.rows);
  }

  public rowChanged(row){
    this.rows[row.index]=row;
    this.rowsChanged.emit(this.rows);
  }
}
