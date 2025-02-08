import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardShopComponent } from './components/card-shop/card-shop.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RouterModule } from '@angular/router';
import {ToastrModule} from "ngx-toastr"

import {BreadcrumbModule} from 'xng-breadcrumb'

@NgModule({
  declarations: [
    CardShopComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    PaginationModule,
    BreadcrumbModule,
    RouterModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'increasing',
      timeOut: 5000
    })
  ],
  exports:[
    CardShopComponent,
    MatSidenavModule,
    PaginationModule,
    ToastrModule,
    BreadcrumbModule
  ],

})
export class SharedModule { }
