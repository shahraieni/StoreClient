import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBrand } from 'src/app/shared/models/brand';
import { IType } from 'src/app/shared/models/type';
import { ShopService } from '../shop.service';
import { ShopParams } from 'src/app/shared/models/shop-params';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-shop-filters',
  templateUrl: './shop-filters.component.html',
  styleUrls: ['./shop-filters.component.scss']
})
export class ShopFiltersComponent implements OnInit , OnDestroy {
   @Output() updateParams = new EventEmitter<boolean>
  private sub = new Subscription();
  public  brands :IBrand[];
  public types : IType[];
  sortOptions = [
    {key:1 , title:'عنوان' },
    {key:2 , title:'نوع محصول' },
    {key:3 , title:'قیمت' }
  ];
  sortTypeOptions =[
    {key:1 , title:'زیاد به کم' },
    {key:2 , title:' کم به زیاد' },
    
  ]
  public shoparams :ShopParams

  constructor(private shopService:ShopService){

  }
  ngOnInit(): void {
    this.shoparams = this.shopService.getShopParams();
    this.getBrands();
    this.getTypes();
  }

  onChangeSort(sort:number){
    debugger
      this.shoparams.sort = sort;
      this.shopService.updateShopParams(this.shoparams);
      this.updateParams.emit(true)
  }
  onChangeTypeSort(sortType :number){
    this.shoparams.typeSort = sortType;
    this.shopService.updateShopParams(this.shoparams);
    this.updateParams.emit(true)
  }

  
  onChangeTypes(typeId : number){
     this.shoparams.typeId = typeId;
     this.shopService.updateShopParams(this.shoparams);
     this.updateParams.emit(true)
      
  }

  onChangeBrand(brandId:number){
    this.shoparams.brandId = brandId;
     this.shopService.updateShopParams(this.shoparams);
     this.updateParams.emit(true)
  }
  private getTypes() {
    this.sub.add(this.shopService.getTypes().subscribe(res => {
      this.types = res;
      
    }));
  }
  private getBrands() {
    this.sub.add(this.shopService.getBrands().subscribe(res => {
          this.brands = res;
          
        }));
      }
      ngOnDestroy(): void {
       this.sub.unsubscribe();
      }
}
