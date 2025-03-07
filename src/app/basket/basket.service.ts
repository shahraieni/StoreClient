import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, retry, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Basket, IBasket, IBasketItems, IBasketTotal } from '../shared/models/basket';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private backendUrl= environment.backendUrl;
  private basketItem = new BehaviorSubject<IBasket>(null);
  basketItem$ = this.basketItem.asObservable();

  private totalBasket = new BehaviorSubject<IBasketTotal>(null);
  totalBasket$ = this.totalBasket.asObservable();


  constructor(private http: HttpClient) {

   }

  getBasket(id:string){
    return this.http.get<IBasket>(`${this.backendUrl}/basket/${id}`).pipe(map(basket=>{
         this.basketItem.next(basket);

         this.calculateTotale();
         return basket;
    }))
  }
  setBasket(basket : IBasket){
    return this.http.post<IBasket>(`${this.backendUrl}/basket/`,basket).pipe(map(basket=>{
        this.basketItem.next(basket);
        this.calculateTotale();
        return basket;
    }))
  }
  deleteBasket(id :string){
    //TODO
  }
  getCurrentBasketSource(){
    return this.basketItem.getValue();
  }
  addItemToBasket(product:IProduct,quantity=1){
        const itemToAdd :IBasketItems = this.mapPoroductToBasketItem(product,quantity);//ساختن item
        const basket = this.getCurrentBasketSource() ?? this.creatBasket();//بررسی میکنیم که سبد خرید وجود دارد 
        basket.items = this.addOrUpdateBasketItems(itemToAdd,basket.items , quantity);//بررسی میکنیم که itemدر سبد خرید وجود دارد یا نه
       return   this.setBasket(basket);//
  }
  deleteItemFromBasket(id :number){
        if(this.getCurrentBasketSource()){
            const  basketId = this.getCurrentBasketSource().id;
            return this.http.delete<IBasket>(`${this.backendUrl}/basket/DeleteItem/${basketId}/${id}`).pipe(
              tap(res=>{
                  if(res.items.length === 0){
                      this.basketItem.next(null);
                      this.totalBasket.next(null);
                      localStorage.removeItem(environment.keyLocalStoragBasket)
                  }else{
                      this.basketItem.next(res);
                      this.calculateTotale();
                  }
              })
            );
        }
      return of(null) ; 
  }

  increaseItemQuantity(id :number ){
      const basket = this.getCurrentBasketSource();
      const itemIndex = basket.items.findIndex(x=> x.id === id);
      if(itemIndex != -1){
        const item = basket.items[itemIndex];
        item.quantity += 1;
        return this.setBasket(basket);
        
      }

      return of(null) ;
  }

  decreaseItemQuantity(id :number){
    const basket = this.getCurrentBasketSource();
    const itemIndex = basket.items.findIndex(x=> x.id === id);
    if(itemIndex != -1){
      const item = basket.items[itemIndex];
      if(item.quantity > 1){
        item.quantity--;
        return this.setBasket(basket)
      }else{
          return this.deleteItemFromBasket(item.id);
      }
    }
    return of(null);
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

  private calculateTotale(){

    const basket = this.getCurrentBasketSource();
    let shipping = 145000;
    let subTotal = basket.items.reduce((init , item)=>{
      return item.price * item.quantity + init
    },0);
    let total = subTotal + shipping;
    this.totalBasket.next({shipping:shipping , subTotal:subTotal , total:total})
  }


  
}
