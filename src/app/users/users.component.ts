import { Component, OnInit } from '@angular/core';
import { User } from '../service/user';
import { ApiService } from '../service/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileComponent } from '../profile/profile.component';






@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  UsersList: User[]=[]

  constructor(private apiService: ApiService, private dialog: MatDialog,private _snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this.apiService.GetAllUsers().subscribe({
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
    this.apiService.DeleteUser(id).subscribe(()=>{
    this.getUsers()
    this._snackBar.open("Usuario eliminado","",{duration:3000})
    })
    
  }

  createUser(){
    const dialogRef = this.dialog.open(ProfileComponent, {data: {id:''},})
    dialogRef.afterClosed().subscribe(()=>{
      this.getUsers()
    })
  }

  

  

}


