import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomepageComponent, RegisterComponent, LoginComponent } from './views';
import {
  NavbarComponent,
  UserCardComponent,
  NoteCreateComponent,
} from './components';
import { AuthService, NoteService } from './services';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    UserCardComponent,
    NoteCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [ AuthService, NoteService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
