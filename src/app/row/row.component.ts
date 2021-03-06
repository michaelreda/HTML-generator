import { FormsModule } from '@angular/forms';
import { HtmlComponent } from './../html/html.component';
import { RowsService } from './../rows.service';
import { Component, OnInit, Input } from '@angular/core';
import { Row } from '../row';
import { SortablejsOptions } from 'angular-sortablejs';


@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent implements OnInit {

  sortableOptions: SortablejsOptions = {
    onUpdate: (event: any) => {
      this.componentsOrderChanged();
    }
  };
  rowStyle: string;
  componentToAdd:string="Def";
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

 
  addComponent(e){
    this.componentToAdd = e.target.value;
    if(this.componentToAdd != "Def"){
      this.row.components.push(
        {
          "id": new Date(),
          "type":this.componentToAdd
        }
      )
      this.rowsService.rowChanged(this.row)
      this.componentToAdd="Def";
      e.target.value="Def";
    }
  }

  componentsOrderChanged(){
    this.rowsService.rowChanged(this.row);
  }

  deleteRow(){
    this.rowsService.deleteRow(this.row);
  }

}
