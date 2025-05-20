import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path : '', redirectTo:'login',pathMatch:'full'},
  { path :'login',component: LoginComponent},
  { path :'users',component: UsersComponent},
  { path :'sign-up',component: SignUpComponent},
  { path :'products',component: ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
