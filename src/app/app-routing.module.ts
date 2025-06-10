import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  { 
    path : 'auth',
    loadChildren:() => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  { 
    path : 'users',
    loadChildren:() => import('./features/users/users.module').then(m => m.UsersModule)
  },
  { 
    path : 'products',
    loadChildren:() => import('./features/products/products.module').then(m => m.ProductsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
