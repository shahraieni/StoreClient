import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFountComponent } from './core/layers/not-fount/not-fount.component';

const routes: Routes = [
  {
    path :'',
    title:'صفحه اصلی',
    loadChildren:()=>import('./home/home.module').then(x=>x.HomeModule),
    data:{breadcrumb : 'خانه'}
  },
  {
    path :'basket',
    title:'سبد خرید',
    loadChildren:()=>import('./basket/basket.module').then(x=>x.BasketModule),
    data:{breadcrumb : 'سبد خرید'}
  },
  {
    path :'shop',
    title:'فروشگاه',
    loadChildren:()=>import('./shop/shop.module').then(x=>x.ShopModule),
    data:{breadcrumb : 'محصولات'}
  },

  {
    path:'notfount' ,
    title:'صفحه یافت نشد',
     component:NotFountComponent,
  },
  
  {
    path:'**' ,
    title:'صفحه یافت نشد',
     component:NotFountComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
