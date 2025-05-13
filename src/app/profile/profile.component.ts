import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../service/user';
import { ApiService } from '../service/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { updateRequest } from '../service/updateRequest';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogConfig } from '@angular/cdk/dialog';
import { UsersComponent } from '../users/users.component';
import { createUserRequest } from '../service/createUserRequest';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user:User = {name:"",email:"",id:"",isEmailVerified:false,role:""}
  hide = true

  userForm = this.formBuilder.group({
    name: ['',Validators.required],
    email: ['',[Validators.required,Validators.email]],
    password: ['',Validators.required],
    role: ['',Validators.required]
    
  })

  constructor(private apiService:ApiService, private formBuilder: FormBuilder,private _snackBar: MatSnackBar,public dialogRef:MatDialogRef<UsersComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogConfig){
    this.apiService.currenUserData.subscribe({
      next: (userData) =>{
        this.user = userData;
      }
    })
    
  }
  ngOnInit(): void {
    if(this.data.id != undefined){
      this.apiService.GetUser(this.data.id).subscribe({
        next: (userData) =>{
          this.user = userData;
        }
      })
    }else{
      
    }
    
  }
  



  getErrorMessage() {
    if (this.userForm.controls.email.hasError('required')) {
      return 'Debe ingresar su email';
    }
    return this.userForm.controls.email.hasError('email') ? 'El email no es valido' : '';
  }
  updateUser(){
    this.apiService.UpdateUser(this.data.id+"",{name:this.userForm.get("name")?.value,email:this.userForm.get("email")?.value} as updateRequest).subscribe({
      complete:()=>{
        this._snackBar.open("Usuario actualizado","",{duration:3000})
        this.dialogRef.close()
      }
      
    })
  }

  createUser(){
    this.apiService.CreateUser(this.userForm.value as createUserRequest).subscribe({
      complete:()=>{
        this._snackBar.open("Usuario creado","",{duration:3000})
        this.dialogRef.close()
      }
    })
  }
}
