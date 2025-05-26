import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from '../components/users/users.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { ProductsComponent } from 'src/components/products/products.component';
import { LoginComponent } from 'src/components/login/login.component';
import { NoAuthGuard } from 'src/service/AuthGuard/no-auth.guard';
import { AuthGuard } from 'src/service/AuthGuard/auth.guard';


const routes: Routes = [
  { path : '', redirectTo:'login',pathMatch:'full'},
  { path :'login',component: LoginComponent,canActivate:[NoAuthGuard]},
  { path :'sign-up',component: SignUpComponent,canActivate:[NoAuthGuard]},
  
  { path :'users',component: UsersComponent,canActivate:[AuthGuard]},
  { path :'products',component: ProductsComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
