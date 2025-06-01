import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Components
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { LoginComponent } from '../components/login/login.component';
import { UsersComponent } from '../components/users/users.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { StoreComponent } from '../components/store/store.component';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { HeaderComponent } from '../components/header/header.component';
import { ProductsComponent } from '../components/products/products.component';
import { ProductFormComponent } from '../components/product-form/product-form.component';
import { MensajeComponent } from '../components/mensaje/mensaje.component';

//Services
import { JwtInterceptorService } from 'src/service/Interceptor/jwt-interceptor.service';
import { ErrorInterceptorService } from 'src/service/Interceptor/error-interceptor.service';

//Material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    UsersComponent,
    HeaderComponent,
    ProfileComponent,
    ProductsComponent,
    ProductFormComponent,
    MensajeComponent,
    StoreComponent,
    ProductCardComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatCardModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptorService,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorService,multi:true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
