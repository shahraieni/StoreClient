import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasketService } from './basket.service';
import { Observable, Subscription } from 'rxjs';
import { IBasket, IBasketItems } from '../shared/models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent  implements OnInit , OnDestroy {

basket$:Observable<IBasket>;
sub$ = new  Subscription
  constructor(private baskeService : BasketService){}
  ngOnInit(): void {
    
    this.basket$ = this.baskeService.basketItem$;
   
  }

  increaseItemQuantity(item : IBasketItems){
      this.baskeService.increaseItemQuantity(item.id).subscribe();
  }

  decreaseItemQuantity(item : IBasketItems){
      this.baskeService.decreaseItemQuantity(item.id).subscribe();
  }


  ngOnDestroy(): void {
    
  }

}
