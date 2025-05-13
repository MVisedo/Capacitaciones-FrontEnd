import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
  
  constructor(private apiService:ApiService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token= this.apiService.userToken;

    if(token != ""){
      req=req.clone(
        {
          setHeaders:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization':`Bearer ${token}`,
          },
          
        }
      )
    }
    return next.handle(req);
  }
}
