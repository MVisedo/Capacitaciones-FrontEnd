import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { StoreComponent } from './pages/store/store.component';
import { StockComponent } from './pages/stock/stock.component';

const routes: Routes = [
  {path: '',redirectTo: 'store',pathMatch: 'full',},
  {path:'manage-products',component:ProductsComponent},
  {path:'store',component:StoreComponent},
  {path:'stock',component:StockComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
