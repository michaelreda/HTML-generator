import { RowsService } from "./../rows.service";
import { Component, OnInit } from "@angular/core";
import { Row } from "../row";

@Component({
  selector: "app-page-view",
  templateUrl: "./page-view.component.html",
  styleUrls: ["./page-view.component.css"]
})
export class PageViewComponent implements OnInit {
  rows: Row[]=[];
  constructor(private rowsService: RowsService) {}

  ngOnInit() {
    this.rowsService.rowsChanged.subscribe(rows => {
      this.rows = rows;
    });
    this.addRow();
  }

  addRow() {
    this.rowsService.addRow();
  }

  exportState(){
    var encodedUri = encodeURI("data:text;charset=utf-8,"+JSON.stringify(this.rowsService.rows));
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "state.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
  }
}
