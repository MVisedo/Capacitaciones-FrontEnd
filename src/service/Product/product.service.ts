import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { catchError, Observable, throwError } from "rxjs"
import { Product } from "./product"
import { ProductsList } from "./productList"
import { UpdateUserRequest } from "../User/updateUserRequest"
import { CreateProductRequest } from "./createProductRequest"
import { UpdateProductRequest } from "./updateProductRequest"
import { queryProducts } from "./queryProducts"

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