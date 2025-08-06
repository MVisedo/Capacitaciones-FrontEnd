import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { StockComponent } from './pages/stock/stock.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { StoreComponent } from './pages/store/store.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductsComponent } from './pages/products/products.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StockComponent,
    ProductCardComponent,
    StoreComponent,
    ProductFormComponent,
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
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
    MatExpansionModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class ProductsModule {}
