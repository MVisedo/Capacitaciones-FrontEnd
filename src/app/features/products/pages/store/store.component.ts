import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/features/products/models/product.model';
import { ProductService } from 'src/app/features/products/services/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  constructor(private productService: ProductService) {}

  productList: Product[] = [];
  getProducts() {
    this.productService.GetProducts({ page: 1, limit: 100 }).subscribe({
      next: (productsData) => {
        this.productList = productsData.results;
      },
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }
}
