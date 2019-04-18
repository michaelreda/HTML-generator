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
}
