import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { IPagination } from './shared/models/pagination';
import { IProduct } from './shared/models/product';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'StoreClient';
  
  constructor (private basketService:BasketService ){}
  ngOnInit(): void {
  
    this.getBasket();
  }


  private getBasket() {
    const basketId = localStorage.getItem(environment.keyLocalStoragBasket);
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(res => {
        console.log(res);

      });
    }
  }
}
