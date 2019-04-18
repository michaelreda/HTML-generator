import { RowsService } from './../rows.service';
import { Row } from './../row';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.css']
})
export class HtmlComponent implements OnInit {
  @Input() component;
  @Input() row:Row;
  constructor(private rowsService:RowsService) {
    
  }

  ngOnInit() {
    this.editComponent()
  }

  getTextAttributes(){
    // var text=""
    if(this.component.attributes != undefined){
      var text = prompt("Enter the text you want",this.component.attributes.text)
    }else{
      var text = prompt("Enter the text you want")
    }
    return {"text":text}
  }

  editComponent(){
    if(this.component != undefined){
      if(this.component.type=="Text"){
        this.component.attributes= this.getTextAttributes();
      }
      this.rowsService.rowChanged(this.row)
    }
  }

  deleteComponent(){
    var ID = this.component.id
    this.row.components = this.row.components.filter(function(c){
      if(ID != c.id)
        return c;
    })
    this.rowsService.rowChanged(this.row)
  }

}
