import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class PageTitleService {

  pageTitleChangedEvent:EventEmitter<string>=new EventEmitter();
  constructor() { }

  pageTitleChanged(pageTitle){
    this.pageTitleChangedEvent.emit(pageTitle);
  }
}
