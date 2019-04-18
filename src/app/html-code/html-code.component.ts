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
          if(c.type=="Text" && c.attributes.text!=null){
            this.html+=c.attributes.text;
          }else if(c.type=="Link" ){
            this.html+= "<a href=\""+c.attributes.href+"\""
            if(c.attributes.text!="")
              this.html+= ">"+c.attributes.text+"</a>"
            else
              this.html+= ">"+c.attributes.href+"</a>"
          }
        });
        this.html += "</" + row.style + ">\n";
      });
      this.html += "</html>"
    });
  }

  ngOnInit() {}

}
