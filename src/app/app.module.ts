
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Team } from './team/team.component';
import { TeamList } from './teamList/teamList.component';
import { RouterModule } from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
@NgModule({
  declarations: [
    AppComponent,
    TeamList,
    Team
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
