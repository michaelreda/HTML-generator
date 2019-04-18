import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PageViewComponent } from './page-view/page-view.component';
import { RowComponent } from './row/row.component';
import { HtmlCodeComponent } from './html-code/html-code.component';
import { RowsService } from './rows.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PageViewComponent,
    RowComponent,
    HtmlCodeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [RowsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
