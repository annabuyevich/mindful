import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { JournalComponent } from './journal/journal.component';
import { AppComponent } from './app.component';
import { CameraComponent } from './camera/camera.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ActivitesComponent } from './activites/activites.component';
import { ResourcesComponent } from './resources/resources.component';

@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    HeaderComponent,
    JournalComponent,
    MainPageComponent,
    ActivitesComponent,
    ResourcesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
    {
      path: '',
      component: MainPageComponent
    },
    {
      path: 'journal',
      component: JournalComponent
    },
    {
      path: 'activity',
      component: ActivitesComponent
    },
    {
      path: 'resources',
      component: ResourcesComponent
    }

  ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
