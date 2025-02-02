import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { ShopFiltersComponent } from './shop-filtrrs/shop-filters.component';


@NgModule({
  declarations: [
    ShopComponent,
    ShopFiltersComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    HttpClientModule,
    SharedModule
  ]
})
export class ShopModule { }
