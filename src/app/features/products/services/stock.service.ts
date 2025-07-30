import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { catchError, Observable, throwError } from "rxjs"
import { Stock, UpdateStockRequest } from "../models/stock.model"


@Injectable({
  providedIn: 'root'
})
export class StockService {
    

  constructor(private httpCliente: HttpClient) { 

  }

  

 


  //Stock
   GetStock(productId:string):Observable<Stock>{
    return this.httpCliente.get<Stock>("http://localhost:3001/v1/stocks/"+productId).pipe(
      catchError(this.handleError)
    )
  }

  UpdateStock(productId:string, stock:UpdateStockRequest):Observable<any>{
    return this.httpCliente.patch<any>("http://localhost:3001/v1/stocks/"+productId,stock).pipe(
      catchError(this.handleError)
    )
  }

  DeleteStock(productId:string):Observable<void>{
    return this.httpCliente.delete<void>("http://localhost:3001/v1/stocks/"+productId)
  }

  CreateStock(stock:UpdateStockRequest):Observable<void>{
    return this.httpCliente.post<void>("http://localhost:3001/v1/stocks",stock).pipe(
      catchError(this.handleError)
    )
  }


  private handleError(error:HttpErrorResponse){
    
    return throwError(()=> new Error(error.error.message));
  }

  

 

}