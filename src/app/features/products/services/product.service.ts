import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { catchError, Observable, throwError } from "rxjs"
import { CreateProductRequest, Product, ProductsList, ProductStock, queryProducts, UpdateProductRequest } from "../models/product.model"


@Injectable({
  providedIn: 'root'
})
export class ProductService {
    

  constructor(private httpCliente: HttpClient) { 

  }

  

 


  //Product
   GetProduct(id:string):Observable<Product>{
    return this.httpCliente.get<Product>("http://localhost:3000/v1/products/"+id).pipe(
      catchError(this.handleError)
    )
  }

  GetProductWhitStock(id:string):Observable<ProductStock>{
   return this.httpCliente.get<ProductStock>("http://localhost:3000/v1/products/stock/"+id).pipe(
     catchError(this.handleError)
   )
 }
  
  GetAllProducts(query:queryProducts):Observable<ProductsList>{
    return this.httpCliente.get<ProductsList>("http://localhost:3000/v1/products",{ params:{page:query.page,limit:query.limit} }).pipe(
      catchError(this.handleError)
    )
  }

  UpdateProduct(id:string, product:UpdateProductRequest):Observable<any>{
    return this.httpCliente.patch<any>("http://localhost:3000/v1/products/"+id,product).pipe(
      catchError(this.handleError)
    )
  }

  UpdateProductStock(id:string, cantidad:number):Observable<any>{
    return this.httpCliente.patch<any>("http://localhost:3000/v1/products/stock/"+id,{cantidad:cantidad}).pipe(
      catchError(this.handleError)
    )
  }



  DeleteProduct(id:string):Observable<void>{
    return this.httpCliente.delete<void>("http://localhost:3000/v1/products/"+id)
  }

  CreateProduct(product:CreateProductRequest):Observable<void>{
    return this.httpCliente.post<void>("http://localhost:3000/v1/products",product).pipe(
      catchError(this.handleError)
    )
  }


  private handleError(error:HttpErrorResponse){
    
    return throwError(()=> new Error(error.error.message));
  }

  

 

}