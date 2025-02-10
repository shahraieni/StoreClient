import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-shop-detail',
  
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss']
})
export class ShopDetailComponent  implements OnInit {
  id:number
  constructor(
    private shopService :ShopService ,
    private rout : ActivatedRoute  ,
    private title :Title,
    private bc : BreadcrumbService
  )
  {
    this.id = Number (this.rout.snapshot?.paramMap?.get('id'))
  }
  ngOnInit(): void {
    this.shopService.getProduct(this.id).subscribe(res=>{
      this.bc.set('@ProductDetil' , res.title)
      this.title.setTitle(res?.title)
      console.log(res);
      //TODO  getProduct
      
    })
  }
}
