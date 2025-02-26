import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardShopComponent } from './components/card-shop/card-shop.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RouterModule } from '@angular/router';
import {ToastrModule} from "ngx-toastr";
import { OrderTotalComponent } from './components/order-total/order-total.component'



@NgModule({
  declarations: [
    CardShopComponent,
    OrderTotalComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    PaginationModule,
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
    OrderTotalComponent
  ],

})
export class SharedModule { }
