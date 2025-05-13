import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { User } from './user';
import { signUpRequest } from './signUpRequest';
import { UsersList } from './userList';
import { updateRequest } from './updateRequest';
import { createUserRequest } from './createUserRequest';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  currentUserLoginOn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currenUserData : BehaviorSubject<User> = new BehaviorSubject<User>({
    id:"",
    name:"",
    email:"",
    role:"",
    isEmailVerified:false
  })
  currenToken : BehaviorSubject<String> = new BehaviorSubject<String>("")
    

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

  GetUser(id:string):Observable<User>{
    return this.httpCliente.get<User>("http://localhost:3000/v1/users/"+id).pipe(
      catchError(this.handleError)
    )
  }

  GetAllUsers():Observable<UsersList>{
    return this.httpCliente.get<UsersList>("http://localhost:3000/v1/users").pipe(
      catchError(this.handleError)
    )
  }

  UpdateUser(id:string, user:updateRequest):Observable<any>{
    return this.httpCliente.patch<any>("http://localhost:3000/v1/users/"+id,user).pipe(
      catchError(this.handleError)
    )
  }

  DeleteUser(id:string):Observable<void>{
    return this.httpCliente.delete<void>("http://localhost:3000/v1/users/"+id)
  }

  CreateUser(user:createUserRequest):Observable<void>{
    return this.httpCliente.post<void>("http://localhost:3000/v1/users",user).pipe(
      catchError(this.handleError)
    )
  }


  private handleError(error:HttpErrorResponse){
    
    return throwError(()=> new Error(error.error.message));
  }

  get userData():Observable<User>{
    return this.currenUserData.asObservable();
  }

  get userLoginOn():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get userToken():String{
    return this.currenToken.value;
  }

 

}
