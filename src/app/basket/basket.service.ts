import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Basket, IBasket, IBasketItems } from '../shared/models/basket';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private backendUrl= environment.backendUrl;
  private basketItem = new BehaviorSubject<IBasket>(null);
  basketItem$ = this.basketItem.asObservable();

  constructor(private http: HttpClient) { }

  getBasket(id:string){
    return this.http.get<IBasket>(`${this.backendUrl}/basket/${id}`).pipe(map(basket=>{
         this.basketItem.next(basket);
         return basket;
    }))
  }
  setBasket(basket : IBasket){
    return this.http.post<IBasket>(`${this.backendUrl}/basket/`,basket).pipe(map(basket=>{
        this.basketItem.next(basket);
        return basket;
    }))
  }
  deleteBasket(id :string){
    //TODO
  }

  addItemToBasket(product:IProduct,quantity=1){
        const itemToAdd :IBasketItems = this.mapPoroductToBasketItem(product,quantity);//ساختن item
        const basket = this.getCurrentBasketSource() ?? this.creatBasket();//بررسی میکنیم که سبد خرید وجود دارد 
        basket.items = this.addOrUpdateBasketItems(itemToAdd,basket.items , quantity);//بررسی میکنیم که itemدر سبد خرید وجود دارد یا نه
       return   this.setBasket(basket);//
  }

  private creatBasket(){
    const basket = new Basket();
    localStorage.setItem(environment.keyLocalStoragBasket,basket.id);
    return basket;
  }

  private addOrUpdateBasketItems(itemToAdd:IBasketItems,items :IBasketItems[],quantity: number):IBasketItems[]{
      const index = items.findIndex(x=>x.id === itemToAdd.id);
      if(index == -1){
        itemToAdd.quantity = quantity;
        items.push(itemToAdd);
      }else{
        items[index].quantity += quantity;
      }
     
        return items;
  }

  private mapPoroductToBasketItem(product:IProduct,quantity:number):IBasketItems{
      return {
          id:product.id,
          brand:product.productBrand,
          discount :0,
          pictureUrl:product.pictureUrl,
          price:product.price,
          product : product.title,
          quantity:quantity,
          type: product.productType
      }
  }


  getCurrentBasketSource(){
    return this.basketItem.getValue();
  }
}
