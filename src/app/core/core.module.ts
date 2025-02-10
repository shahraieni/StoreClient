import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './layers/footer/footer.component';
import { NavbarComponent } from './layers/navbar/navbar.component';
import {RouterModule} from '@angular/router';
import { NotFountComponent } from './layers/not-fount/not-fount.component'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlingInterceptor } from './interceptors/error-handling.interceptor';
import { BreadcrumbComponent } from './layers/breadcrumb/breadcrumb.component';
import {BreadcrumbModule} from 'xng-breadcrumb'
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './interceptors/loading.interceptor';




@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    NotFountComponent,
    BreadcrumbComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbModule,
    NgxSpinnerModule
  ],
  exports:[
    FooterComponent,
    NavbarComponent,
    BreadcrumbComponent,
    NgxSpinnerModule
  ],
  providers:[
    {
      provide : HTTP_INTERCEPTORS,
      useClass : ErrorHandlingInterceptor,
      multi :true
    },
    {
      provide : HTTP_INTERCEPTORS,
      useClass : LoadingInterceptor,
      multi :true
    }
  ]
})
export class CoreModule { }
