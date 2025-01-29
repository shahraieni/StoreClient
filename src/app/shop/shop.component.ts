import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent   implements OnInit, OnDestroy{
private sub = new Subscription();

  constructor(private shopService:ShopService){}
  
  ngOnInit(): void {

   this.sub.add(this.shopService.getProduct().subscribe(res=>{
    console.log(res);
    
  }))    
  }
  ngOnDestroy(): void {

    this.sub.unsubscribe();
  }

}
