import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './layers/footer/footer.component';
import { NavbarComponent } from './layers/navbar/navbar.component';
import {RouterModule} from '@angular/router';
import { NotFountComponent } from './layers/not-fount/not-fount.component'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlingInterceptor } from './interceptors/error-handling.interceptor';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    NotFountComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    FooterComponent,
    NavbarComponent
  ],
  providers:[
    {
      provide : HTTP_INTERCEPTORS,
      useClass : ErrorHandlingInterceptor,
      multi :true
    }
  ]
})
export class CoreModule { }
