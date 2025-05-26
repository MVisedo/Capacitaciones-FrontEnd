import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, tap, throwError } from "rxjs";
import { LoginRequest } from "./loginRequest";
import { User } from "../User/user";
import { signUpRequest } from "./signUpRequest";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    currentUserLoginOn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    currenToken : BehaviorSubject<String> = new BehaviorSubject<String>("")
    currenUserData : BehaviorSubject<User> = new BehaviorSubject<User>({
        id:"",
        name:"",
        email:"",
        role:"",
        isEmailVerified:false
      })

    constructor(private httpCliente: HttpClient) { 
        this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token")!= null);
        this.currenToken = new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
    }

      Login(credentials: LoginRequest):Observable<any>{
        
        return this.httpCliente.post<any>('http://localhost:3000/v1/auth/login',credentials).pipe(
          tap( (userData) =>{
            sessionStorage.setItem("token",userData.tokens.access.token)
            this.currenUserData.next(userData.user);
            this.currentUserLoginOn.next(true);
            this.currenToken.next(userData.tokens.access.token);
    
          }),
          catchError(this.handleError)
        )
      }
    
      Logout():void{
        sessionStorage.removeItem("token");
        this.currentUserLoginOn.next(false);
      }
    
      SignUp(userData: signUpRequest):Observable<any>{
        return this.httpCliente.post<any>('http://localhost:3000/v1/auth/register',userData).pipe(
          tap( (userData) =>{
            sessionStorage.setItem("token",userData.tokens.access.token)
            this.currenUserData.next(userData.user);
            this.currentUserLoginOn.next(true);
          }),
          catchError(this.handleError)
        )
      }

      private handleError(error:HttpErrorResponse){
          
        return throwError(()=> new Error(error.error.message));
      }
}
