import { Component} from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Router} from '@angular/router';
import { LoginRequest } from '../service/loginRequest';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  hide = true;

  loginForm = this.formBuilder.group({
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required]
  })


  constructor(
    private apiService: ApiService,
    private formBuilder:FormBuilder,
    private router:Router,
    private _snackBar: MatSnackBar
  ){}
  
  getErrorMessage() {
    if (this.loginForm.controls.email.hasError('required')) {
      return 'Debe ingresar su email';
    }
    return this.loginForm.controls.email.hasError('email') ? 'El email no es valido' : '';
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  
  Login(){
    if(this.loginForm.valid){
      this.apiService.Login(this.loginForm.value as LoginRequest).subscribe({
        error: (errorData) =>{
          this.openSnackBar(errorData.message,"Accept")
        },
        complete: () =>{
          this.loginForm.reset();
          this.router.navigateByUrl('/users');
        }
      })
    }
  }

  

  
}
