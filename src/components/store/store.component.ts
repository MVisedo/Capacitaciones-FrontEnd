import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/service/Product/product';
import { ProductService } from 'src/service/Product/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit{
  constructor(private productService:ProductService){}

  productList:Product[] = []
    getProducts(){
    this.productService.GetAllProducts({page:1,limit:5}).subscribe({
      next:(productsData)=>{
        this.productList = productsData.results
      },
      
    })
    
  }

  ngOnInit(): void {
    this.getProducts()
  }
}
