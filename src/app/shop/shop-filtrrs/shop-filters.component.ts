import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBrand } from 'src/app/shared/models/brand';
import { IType } from 'src/app/shared/models/type';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-shop-filters',
  templateUrl: './shop-filters.component.html',
  styleUrls: ['./shop-filters.component.scss']
})
export class ShopFiltersComponent implements OnInit , OnDestroy {

  private sub = new Subscription();
  public  brands :IBrand[];
  public types : IType[];

  constructor(private shopService:ShopService){

  }
  ngOnInit(): void {
    this.getBrands();
    this.getTypes();
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
