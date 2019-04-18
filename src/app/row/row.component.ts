import { HtmlComponent } from './../html/html.component';
import { RowsService } from './../rows.service';
import { Component, OnInit, Input } from '@angular/core';
import { Row } from '../row';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent implements OnInit {

  rowStyle: string;
  componentToAdd:string="+";
  @Input() row: Row;
  constructor(private rowsService:RowsService) { 
    
  }

  ngOnInit() {
    this.rowStyle = this.row.style;
  }

  styleChanged(){
    this.row.style = this.rowStyle;
    this.rowsService.rowChanged(this.row);
  }

  addComponent(){
    if(this.componentToAdd != "+"){
      this.row.components.push(
        {
          "type":this.componentToAdd
        }
      )
      this.rowsService.rowChanged(this.row)
    }
    this.componentToAdd="+";
  }

}
