import { Component, OnInit } from "@angular/core";
import { RowsService } from "../rows.service";

@Component({
  selector: "app-html-code",
  templateUrl: "./html-code.component.html",
  styleUrls: ["./html-code.component.css"]
})
export class HtmlCodeComponent implements OnInit {
  html = "";
  constructor(private rowsService: RowsService) {
    this.rowsService.rowsChanged.subscribe(rows => {
      this.html = "";
      rows.forEach(row => {
        this.html += "<" + row.style + ">";

        this.html += "</" + row.style + ">\n";
      });
    });
  }

  ngOnInit() {}
}
