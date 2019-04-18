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
      this.html = "<html>\n";
      rows.forEach(row => {
        this.html += "<" + row.style + ">";
        row.components.forEach(c => {
          if (c.attributes == undefined)
            return
          if(c.type=="Text" ){
            this.html+=c.attributes.text;
          }
        });
        this.html += "</" + row.style + ">\n";
      });
      this.html += "</html>"
    });
  }

  ngOnInit() {}

}
