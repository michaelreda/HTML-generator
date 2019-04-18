import { Component, OnInit,Output,EventEmitter } from "@angular/core";
import { RowsService } from "../rows.service";

@Component({
  selector: "app-html-code",
  templateUrl: "./html-code.component.html",
  styleUrls: ["./html-code.component.css"]
})
export class HtmlCodeComponent implements OnInit {
  
  @Output() htmlChanged: EventEmitter<String> =new EventEmitter();
  html:string;
  constructor(private rowsService: RowsService) {
    this.rowsService.rowsChanged.subscribe(rows => {
      this.html = "<html>\n";
      this.html += "<body>\n";
      rows.forEach(row => {
        this.html += "<" + row.style + ">";
        row.components.forEach(c => {
          if (c.attributes == undefined)
            return
          if(c.type=="Text" && c.attributes.text!=null){
            this.html+=c.attributes.text;
          }
          
          else if(c.type=="Link" ){
            this.html+= "<a href=\""+c.attributes.href+"\""
            if(c.attributes.text!="" && c.attributes.text!=null)
              this.html+= ">"+c.attributes.text+"</a>"
            else
              this.html+= ">"+c.attributes.href+"</a>"
          }

          else if(c.type=="Image" ){
            this.html+= "<img src=\""+c.attributes.src+"\""
            if(c.attributes.width!="" && c.attributes.width!= null)
              this.html+= " width=\""+c.attributes.width+"\""
            if(c.attributes.height!="" && c.attributes.height!=null)
              this.html+= " height=\""+c.attributes.height+"\""
            this.html+="/>"
          }

          else if(c.type=="Audio" ){
            this.html+= "<audio src=\""+c.attributes.src+"\" controls />"
          }

          else if(c.type=="Video" ){
            this.html+= "<video src=\""+c.attributes.src+"\""
            if(c.attributes.width!="" && c.attributes.width!= null)
              this.html+= " width=\""+c.attributes.width+"\""
            if(c.attributes.height!="" && c.attributes.height!=null)
              this.html+= " height=\""+c.attributes.height+"\""
            this.html+="controls />"
          }

          else if(c.type=="Iframe" ){
            this.html+= "<iframe src=\""+c.attributes.src+"\">"
            this.html+="</iframe>"
          }
        });
        this.html += "</" + row.style + ">\n";
      });
      this.html += "</body>\n"
      this.html += "</html>"
      this.htmlChanged.emit(this.html)
    });
  }

  ngOnInit() {}

  exportFile(){
    var encodedUri = encodeURI("data:text/html;charset=utf-8,"+this.html);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "generated HTML.html");
    document.body.appendChild(link); // Required for FF

    link.click();
  }

}
