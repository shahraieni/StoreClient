import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
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
  public sidenavOpen :boolean = true;
  public data :IPagination<IProduct>; 
  private sub = new Subscription();
  public  brands :IBrand[];
  public types : IType[];

  constructor(private shopService:ShopService){}
  
  ngOnInit(): void {
    this.GetProducts();    

  }


  @HostListener("window:resize")
  public onWindowResize(){
    window.innerWidth <960 ? (this.sidenavOpen = false) : (this.sidenavOpen = true);
  }

  private GetProducts() {
    
    this.sub.add(this.shopService.getProduct().subscribe(res => {
      this.data = res;
    }));
  }
  updateParams(updated:boolean){
    if(updated)
      this.GetProducts();
  }
  ngOnDestroy(): void {

    this.sub.unsubscribe();
  }

}
