import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HTML Generator';
  html:string;

  htmlChanged(html){
    this.html = html.replace(/<title>(\s|[a-z]|[0-9])*<\/title>/,"");
  }
}
