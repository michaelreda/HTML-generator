import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class PageTitleService {

  pageTitle:string = "";
  pageTitleChangedEvent:EventEmitter<string>=new EventEmitter();
  constructor() { }

  pageTitleChanged(pageTitle){
    this.pageTitle=pageTitle;
    this.pageTitleChangedEvent.emit(pageTitle);
  }
}
