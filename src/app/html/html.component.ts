import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.css']
})
export class HtmlComponent implements OnInit {
  @Input() component;
  constructor() {
  }

  ngOnInit() {
  }

}
