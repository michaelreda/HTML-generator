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

  editComponent(){
    if(this.component != undefined){
      if(this.component.type=="Text"){
        this.component.attributes= this.getTextAttributes();
      }else if(this.component.type=="Link"){
        this.component.attributes= this.getLinkAttributes();
      }else if(this.component.type=="Image"){
        this.component.attributes= this.getImageAttributes();
      }else if(this.component.type=="Audio"){
        this.component.attributes= this.getAudioAttributes();
      }else if(this.component.type=="Video"){
        this.component.attributes= this.getVideoAttributes();
      }else if(this.component.type=="Iframe"){
        this.component.attributes= this.getIframeAttributes();
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


  getTextAttributes(){
    // var text=""
    if(this.component.attributes != undefined){
      var text = prompt("Enter the text you want",this.component.attributes.text)
    }else{
      var text = prompt("Enter the text you want")
    }
    return {"text":text}
  }

  getLinkAttributes(){
    // var text=""
    if(this.component.attributes != undefined){
      var href = prompt("Enter the link",this.component.attributes.href)
      var text = prompt("Enter the text for the link",this.component.attributes.text)
    }else{
      var href = prompt("Enter the link")
      var text = prompt("Enter the text for the link")
    }
    return {"href":href,"text":text}
  }

  getImageAttributes(){
    // var text=""
    if(this.component.attributes != undefined){
      var src = prompt("Enter image source",this.component.attributes.src)
      var width = prompt("Enter image width in pixels",this.component.attributes.width)
      var height = prompt("Enter image height in pixels",this.component.attributes.height)
    }else{
      var src = prompt("Enter image source")
      var width = prompt("Enter image width in pixels")
      var height = prompt("Enter image height in pixels")
    }
    return {"src":src,"width":width,"height":height}
  }

  getAudioAttributes(){
    if(this.component.attributes != undefined){
      var src = prompt("Enter audio source",this.component.attributes.src)
    }else{
      var src = prompt("Enter audio source");
    }
    return {"src":src}
  }

  getVideoAttributes(){
    // var text=""
    if(this.component.attributes != undefined){
      var src = prompt("Enter video source",this.component.attributes.src)
      var width = prompt("Enter video width in pixels",this.component.attributes.width)
      var height = prompt("Enter video height in pixels",this.component.attributes.height)
    }else{
      var src = prompt("Enter video source")
      var width = prompt("Enter video width in pixels")
      var height = prompt("Enter video height in pixels")
    }
    return {"src":src,"width":width,"height":height}
  }

  getIframeAttributes(){
    if(this.component.attributes != undefined){
      var src = prompt("Enter iframe source",this.component.attributes.src)
    }else{
      var src = prompt("Enter iframe source");
    }
    return {"src":src}
  }
}
