import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) { }
  public IsCookieExists: boolean = false;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.IsCookieExists = this.cookieService.check('UserLoginAPItoken');
    if(this.IsCookieExists)
    {
    return true;
    }
    else
    {
    this.router.navigate(['/home']);
    return false
    };
  }
}
