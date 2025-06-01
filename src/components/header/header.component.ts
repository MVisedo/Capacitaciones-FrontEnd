import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/Auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userLoginOn: boolean = false;
  userIsAdmin: boolean = false;
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.authService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) =>{
          this.userLoginOn = userLoginOn;
        }
      }
    )
    this.authService.currentUserIsAdmin.subscribe(
      {
        next:(userIsAdmin)=>{
          this.userIsAdmin = userIsAdmin;
        }
      }
    )

  }

  Logout():void{
    this.authService.Logout()
  }

}
