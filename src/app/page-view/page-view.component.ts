import { PageTitleService } from './../page-title.service';
import { RowsService } from "./../rows.service";
import { Component, OnInit,EventEmitter,Output } from "@angular/core";
import { Row } from "../row";

@Component({
  selector: "app-page-view",
  templateUrl: "./page-view.component.html",
  styleUrls: ["./page-view.component.css"]
})
export class PageViewComponent implements OnInit {
  rows: Row[]=[];
  pageTitle:string ="";
  
  constructor(private rowsService: RowsService,private pageTitleService:PageTitleService) {}

  ngOnInit() {
    this.pageTitleService.pageTitleChangedEvent.subscribe(pageTitle=>{
      this.pageTitle=pageTitle;
    })
    this.rowsService.rowsChanged.subscribe(rows => {
      this.rows = rows;
    });
    this.addRow();
  }

  addRow() {
    this.rowsService.addRow();
  }

  exportState(){
    var encodedUri = encodeURI("data:text;charset=utf-8,"+JSON.stringify({rows:this.rowsService.rows,pageTitle:this.pageTitleService.pageTitle}));
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "state.json");
    document.body.appendChild(link); // Required for FF

    link.click();
  }

  loadState(e){
    let fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0]);
    fileReader.onload = (e) => {
      // console.log(fileReader.result);
      var input = JSON.parse(fileReader.result);
      if(input.rows!=undefined){
        this.rowsService.setRows(input.rows);
        if(input.pageTitle!=undefined){
          this.pageTitleService.pageTitleChanged(input.pageTitle);
        }
      }else{
        alert("Invalid file");
      }  
    }

  }

  pageTitleChanged(){
    this.pageTitleService.pageTitleChanged(this.pageTitle);
    console.log(this.pageTitle);
  }
}
