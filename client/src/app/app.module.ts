import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }       from './app.routing';

import { AuthGuard } from './_guards/index';
import { AuthService, HeyService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    HeyService,
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
