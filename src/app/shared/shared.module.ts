import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardShopComponent } from './components/card-shop/card-shop.component';



@NgModule({
  declarations: [
    CardShopComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CardShopComponent
  ]

})
export class SharedModule { }
