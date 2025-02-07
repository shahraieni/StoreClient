import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardShopComponent } from './components/card-shop/card-shop.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CardShopComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    PaginationModule,
    RouterModule
  ],
  exports:[
    CardShopComponent,
    MatSidenavModule,
    PaginationModule
  ],

})
export class SharedModule { }
