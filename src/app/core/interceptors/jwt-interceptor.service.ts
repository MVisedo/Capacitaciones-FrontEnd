import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth.service';
import { MensajeComponent } from 'src/app/shared/components/mensaje/mensaje.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
  
  constructor(private authService:AuthService,private dialog: MatDialog,private router:Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token= this.authService.currenToken.value

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
    
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          const dialogRef = this.dialog.open(MensajeComponent, {data: {titulo:"Permiso denegado",mensaje:"Usted no esta autorizado para acceder a este recurso",aceptar:"Aceptar"},})
          dialogRef.afterClosed().subscribe(()=>{
            this.router.navigate(["/store"])
          })
        }
        if (error.status === 401) {
          const dialogRef = this.dialog.open(MensajeComponent, {data: {titulo:"Credenciales caducadas",mensaje:"Por favor vuelva a iniciar sesion",aceptar:"Aceptar"},})
          dialogRef.afterClosed().subscribe(()=>{
            this.authService.Logout();
            this.router.navigate(["/login"])
          })
        }

        return throwError(() => error);
      })
    )
  }
}
