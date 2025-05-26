import { Component} from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/service/Auth/auth.service';
import { LoginRequest } from 'src/service/Auth/loginRequest';





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
    private authService: AuthService,
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
    this._snackBar.open(message, action,{duration:2000});
  }

  
  Login(){
    if(this.loginForm.valid){
      this.authService.Login(this.loginForm.value as LoginRequest).subscribe({
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
