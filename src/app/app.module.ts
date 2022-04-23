import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { Globals } from './globals';
import { AppComponent } from './app.component';

import { HomepageComponent, LoginComponent } from './views';
import { NavbarComponent, UserCardComponent } from './components';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    NavbarComponent,
    UserCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [ Globals ],
  bootstrap: [AppComponent]
})
export class AppModule { }
