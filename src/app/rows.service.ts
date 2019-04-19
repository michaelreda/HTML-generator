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
    this.rows.push(new Row(this.i))
    this.i++;
    this.rowsChanged.emit(this.rows);
  }

  public rowChanged(row){
    this.rows[row.index]=row;
    this.rowsChanged.emit(this.rows);
  }

  public deleteRow(row){
    this.rows = this.rows.filter(r=>{
      if(r.index != row.index)
        return r;
    })
    var i=0;
    this.rows.forEach(r=>{
      r.index=i;
      i++;
    })
    this.rowsChanged.emit(this.rows);
    console.log(this.rows);
  }
}
