import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../shared/models/product';
import { IPagination } from '../shared/models/ipagination';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent   implements OnInit, OnDestroy{
  public data :IPagination<IProduct>; 
  private sub = new Subscription();

  constructor(private shopService:ShopService){}
  
  ngOnInit(): void {

   this.sub.add(this.shopService.getProduct().subscribe(res=>{
   this.data = res;
    
  }))    
  }
  ngOnDestroy(): void {

    this.sub.unsubscribe();
  }

}
