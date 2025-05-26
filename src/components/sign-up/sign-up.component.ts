import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/service/Auth/auth.service';
import { signUpRequest } from 'src/service/Auth/signUpRequest';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  constructor(private formBuilder:FormBuilder, private authService: AuthService,private router:Router,private _snackBar: MatSnackBar){}

  hide= true;

  signUpForm = this.formBuilder.group({
    name: ['',Validators.required],
    email: ['',[Validators.required,Validators.email]],
    password: ['',Validators.required],
  })

  getErrorMessage() {
    if (this.signUpForm.controls.email.hasError('required')) {
      return 'Debe ingresar su email';
    }
    return this.signUpForm.controls.email.hasError('email') ? 'El email no es valido' : '';
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  SignUp(){
      if(this.signUpForm.valid){
        this.authService.SignUp(this.signUpForm.value as signUpRequest).subscribe({
          error: (errorData) =>{
            this.openSnackBar(errorData.message,"Accept")
          },
          complete: () =>{
            this.signUpForm.reset();
            this.router.navigateByUrl('/users');
          }
        })
      }
    }

}