import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../../features/auth/services/auth.service";

@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.currentUserLoginOn.value) {
      return true;
    }
    this.router.navigate(['/products']);
    return false;
  }
}