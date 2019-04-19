import { PageTitleService } from './../page-title.service';
import { Component, OnInit,Output,EventEmitter } from "@angular/core";
import { RowsService } from "../rows.service";
import {html2json} from "html2json"
import { Row } from '../row';

@Component({
  selector: "app-html-code",
  templateUrl: "./html-code.component.html",
  styleUrls: ["./html-code.component.css"]
})
export class HtmlCodeComponent implements OnInit {
  
  @Output() htmlChanged: EventEmitter<String> =new EventEmitter();
  html:string;
  rows=[];
  pageTitle="";
  constructor(private rowsService: RowsService,private pageTitleService:PageTitleService) {
    pageTitleService.pageTitleChangedEvent.subscribe(pageTitle=>{
      this.pageTitle=pageTitle;
      this.generateHtml(this.pageTitle,this.rows);
    })
    this.rowsService.rowsChanged.subscribe(rows => {
      this.rows=rows;
      this.generateHtml(this.pageTitle,this.rows);
    });
  }

  ngOnInit() {
    
  }

  generateHtml(pageTitle,rows){
    this.html = "<!DOCTYPE html>\n<html>\n";
    this.html += "<head>\n<title>"+pageTitle;
    this.html+="</title>\n</head>\n";
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
      this.htmlCodeChanged(this.html);
      
  }

  htmlCodeChanged(html){
    var htmlJson = html2json(html); 
    console.log(htmlJson)
    var rows =[]
    var pageTitle=""
    var index =0;
    htmlJson.child[0].child.forEach(element => {
      if(element.tag == "head"){
        if(element.child == undefined)
              return
        element.child.forEach(element => {
          if(element.tag == "title"){
            if(element.child == undefined)
              return
            pageTitle = element.child[0].text;
          }
        });
      }else if(element.tag == "body"){
        element.child.forEach(element => {
          if(element.tag == "p" || element.tag == "h1" || element.tag == "h2" || element.tag == "h3" || element.tag == "h4" || element.tag == "h5" || element.tag == "span" ){
            var row= new Row(index);
            index++;
            row.style = element.tag;
            if(element.child == undefined)
              return
            element.child.forEach(element => {
              if(element.node == "text" && element.text != "\n"){
                row.components.push({
                  "id":new Date(),
                  "type":"Text",
                  "attributes":{
                    "text": element.text
                  }
                })
              }else if(element.tag == "a"){
                var comp = {
                  "id":new Date(),
                  "type":"Link",
                  "attributes":{
                    "href": element.attr.href[0],
                    "text": ""
                  }
                }
                if(element.child != undefined)
                  comp.attributes.text = element.child[0].text;
                row.components.push(comp);
              }
            });
            rows.push(row);

          }
        });
      }
    });

    console.log(rows);

    this.htmlChanged.emit(html)
  }

  exportFile(){
    var encodedUri = encodeURI("data:text/html;charset=utf-8,"+this.html);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "generated HTML.html");
    document.body.appendChild(link); // Required for FF

    link.click();
  }

}
