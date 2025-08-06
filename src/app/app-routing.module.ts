import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { AuthGuard } from './core/guards/auth.guard';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  { 
    path : 'auth',
    canActivate:[NoAuthGuard],
    loadChildren:() => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  { 
    path : 'users',
    canActivate:[AuthGuard],
    loadChildren:() => import('./features/users/users.module').then(m => m.UsersModule)
  },
  { 
    path : 'products',
    canActivate:[AuthGuard],
    loadChildren:() => import('./features/products/products.module').then(m => m.ProductsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
