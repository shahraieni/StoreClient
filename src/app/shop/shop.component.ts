import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../shared/models/product';
import { IPagination } from '../shared/models/pagination';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/type';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent   implements OnInit, OnDestroy{

  public data :IPagination<IProduct>; 
  private sub = new Subscription();
  public  brands :IBrand[];
  public types : IType[];

  constructor(private shopService:ShopService){}
  
  ngOnInit(): void {

    this.GetProducts();    
    this.getBrands();
    this.getTypes();
  
  }
  private getTypes() {
    this.sub.add(this.shopService.geTypes().subscribe(res => {
      this.types = res;

    }));
  }
  private getBrands() {
      this.sub.add(this.shopService.getBrands().subscribe(res => {
        this.brands = res;
        
     }));
  }
  private GetProducts() {
    
    this.sub.add(this.shopService.getProduct().subscribe(res => {
      this.data = res;
    }));
  }

  ngOnDestroy(): void {

    this.sub.unsubscribe();
  }

}
