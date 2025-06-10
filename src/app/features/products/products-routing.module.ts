import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { StoreComponent } from './pages/store/store.component';

const routes: Routes = [
  {path:'manage-products',component:ProductsComponent},
  {path:'store',component:StoreComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
