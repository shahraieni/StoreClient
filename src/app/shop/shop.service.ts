import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { Observable } from 'rxjs';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/type';

@Injectable({
  providedIn: 'root'
})
export class ShopService  {
private backendUrl = environment.backendUrl;
  constructor( private http:HttpClient) { }

  getProduct() :Observable<IPagination<IProduct>>{
    
   return   this.http.get<IPagination<IProduct>>(`${this.backendUrl}/product`)
  }


  getBrands(){
      return this.http.get<IBrand[]>(`${this.backendUrl}/productBrand`)
  }
  geTypes(){
    return this.http.get<IType[]>(`${this.backendUrl}/productType`)
  }
 
}
