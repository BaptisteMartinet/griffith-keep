import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomepageComponent, RegisterComponent, LoginComponent } from './views';
import {
  NavbarComponent,
  UserCardComponent,
  NoteCreateComponent,
  NoteCardComponent,
  SnackbarComponent,
} from './components';
import {
  AuthService,
  NoteService,
  SnackbarService,
} from './services';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    UserCardComponent,
    NoteCreateComponent,
    NoteCardComponent,
    SnackbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [ AuthService, NoteService, SnackbarService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
