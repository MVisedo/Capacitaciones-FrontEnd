import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileComponent } from '../../components/profile/profile.component';
import { MensajeComponent } from '../../../../shared/components/mensaje/mensaje.component';
import { queryUsers, User } from 'src/app/features/users/models/user.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UserService } from '../../services/user.service';






@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  UsersList: User[]=[]
  query:queryUsers = {page:1,limit:10}
  totalUsers:number = 0

  constructor(private userService: UserService, private dialog: MatDialog,private _snackBar: MatSnackBar){}


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    ngAfterViewInit() {
      this.paginator.page.subscribe((event: PageEvent) => {
        
        this.query.page = event.pageIndex+1
        this.query.limit = event.pageSize
        this.getUsers()
      })
    }
  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this.userService.GetAllUsers(this.query).subscribe({
      next:(usersData)=>{
        this.UsersList = usersData.results
        this.totalUsers = usersData.totalResults
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
    const dialogRef = this.dialog.open(MensajeComponent, {data: {titulo:"Eliminar usuario",mensaje:"¿Seguro que desea eliminar el usuario?",aceptar:"Eliminar",cancelar:"Cancelar"},})
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


