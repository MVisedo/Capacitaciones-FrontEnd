import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../Auth/auth.service";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.currentUserLoginOn.value) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

