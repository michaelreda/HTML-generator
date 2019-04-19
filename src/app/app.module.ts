import { SortablejsModule } from 'angular-sortablejs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PageViewComponent } from './page-view/page-view.component';
import { RowComponent } from './row/row.component';
import { HtmlCodeComponent } from './html-code/html-code.component';
import { RowsService } from './rows.service';
import { FormsModule } from '@angular/forms';
import { HtmlComponent } from './html/html.component';

@NgModule({
  declarations: [
    AppComponent,
    PageViewComponent,
    RowComponent,
    HtmlCodeComponent,
    HtmlComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SortablejsModule
  ],
  providers: [RowsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
