import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
  
  constructor(private authService:AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token= this.authService.currenToken.value;

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
