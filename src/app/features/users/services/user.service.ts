import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { catchError, Observable, throwError } from "rxjs"
import { createUserRequest, queryUsers, UpdateUserRequest, User, UsersList } from "../models/user.model"


@Injectable({
  providedIn: 'root'
})
export class UserService {
    

  constructor(private httpCliente: HttpClient) { 

  }

  

    //User
    GetUser(id:string):Observable<User>{
        return this.httpCliente.get<User>("http://localhost:3000/v1/users/"+id).pipe(
            catchError(this.handleError)
        )
    }

    GetAllUsers(query:queryUsers):Observable<UsersList>{
        return this.httpCliente.get<UsersList>("http://localhost:3000/v1/users",{ params:{page:query.page,limit:query.limit} }).pipe(
            catchError(this.handleError)
        )
    }

    UpdateUser(id:string, user:UpdateUserRequest):Observable<any>{
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

}