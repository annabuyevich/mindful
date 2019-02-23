import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { JournalComponent } from './journal/journal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    JournalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        component: JournalComponent
      },
      {
        path: 'journal',
        component: JournalComponent
      },
      {
        path: 'activity',
        component: JournalComponent
      }
    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
