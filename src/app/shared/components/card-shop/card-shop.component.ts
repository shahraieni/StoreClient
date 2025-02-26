import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../models/product';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-card-shop',
  templateUrl: './card-shop.component.html',
  styleUrls: ['./card-shop.component.scss']
})
export class CardShopComponent implements OnInit {

  @Input() product : IProduct;
  constructor(private basketService :BasketService){}

  ngOnInit(): void {
    
  }

  addItemToBasket(){
    this.basketService.addItemToBasket(this.product).subscribe(res=>{
      console.log(res)
    })
  }
}
