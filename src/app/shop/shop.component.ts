import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../shared/models/product';
import { IPagination } from '../shared/models/pagination';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/type';
import { ShopParams } from '../shared/models/shop-params';

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
  @ViewChild("search" , {static :false}) serchTerm :ElementRef;
  shopParams :ShopParams;

  constructor(private shopService:ShopService){}
  
  ngOnInit(): void {
    this.GetProducts();
    this.shopParams = this.shopService.getShopParams();    

  }
  onPageChenge(data :any){
     this.shopParams.pageIndex = data.page;
     this.shopService.updateShopParams(this.shopParams)
     this.GetProducts();
      
  }

  onSearch(){
      this.shopParams.search = this.serchTerm?.nativeElement?.value;
      this.shopService.updateShopParams(this.shopParams)
      this.GetProducts()
      
  }

  onReset(){
    this.shopParams = new ShopParams();
    this.shopService.updateShopParams(this.shopParams)
    this.serchTerm.nativeElement.value = "";
    this.GetProducts();
  }


  @HostListener("window:resize")
  public onWindowResize(){
    window.innerWidth <960 ? (this.sidenavOpen = false) : (this.sidenavOpen = true);
  }

  private GetProducts() {
    
    this.sub.add(this.shopService.getProducts().subscribe(res => {
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
