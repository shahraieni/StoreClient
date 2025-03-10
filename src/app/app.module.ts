import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PaginationModule.forRoot(),
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
