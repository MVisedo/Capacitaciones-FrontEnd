import { Component, OnInit } from '@angular/core';
import { User } from '../service/User/user';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileComponent } from '../profile/profile.component';
import { UserService } from '../service/User/user.service';
import { MensajeComponent } from '../mensaje/mensaje.component';






@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  UsersList: User[]=[]

  constructor(private userService: UserService, private dialog: MatDialog,private _snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this.userService.GetAllUsers().subscribe({
      next:(usersData)=>{
        this.UsersList = usersData.results
      },
      
    })
  }


  displayedColumns: string[] = ['id', 'name', 'email', 'role','buttons'];
  
  updatedUser(id:string): void {
    const dialogRef = this.dialog.open(ProfileComponent, {data: {id:id},})
    dialogRef.afterClosed().subscribe(()=>{
      this.getUsers()
    })
  }

  deleteUser(id:string){
    const dialogRef = this.dialog.open(MensajeComponent, {data: {titulo:"Eliminar usuario",mensaje:"¿Seguro que desea eliminar el usuario?"},})
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.userService.DeleteUser(id).subscribe(()=>{
        this.getUsers()
        this._snackBar.open("Usuario eliminado","aceptar",{duration:3000})})
      }
    })
  }     

  createUser(){
    const dialogRef = this.dialog.open(ProfileComponent, {data: {id:''},})
    dialogRef.afterClosed().subscribe(()=>{
      this.getUsers()
    })
  }

  

  

}


