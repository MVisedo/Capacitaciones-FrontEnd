import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Components
import { SignUpComponent } from './features/auth/pages/sign-up/sign-up.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { UsersComponent } from './features/users/pages/users/users.component';
import { ProfileComponent } from './features/users/components/profile/profile.component';
import { StoreComponent } from './features/products/pages/store/store.component';
import { ProductCardComponent } from './features/products/components/product-card/product-card.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ProductsComponent } from './features/products/pages/products/products.component';
import { ProductFormComponent } from './features/products/components/product-form/product-form.component';
import { MensajeComponent } from './shared/components/mensaje/mensaje.component';

//Services
import { JwtInterceptorService } from 'src/app/core/interceptors/jwt-interceptor.service';
import { ErrorInterceptorService } from 'src/app/core/interceptors/error-interceptor.service';

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
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';

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
    MatCardModule,
    MatPaginatorModule,
    MatExpansionModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptorService,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorService,multi:true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
