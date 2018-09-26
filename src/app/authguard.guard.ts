import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private cookieService: CookieService) { }
  public IsCookieExists: boolean = false;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.IsCookieExists = this.cookieService.check('UserLoginAPItoken');
    if(this.IsCookieExists)
    {
    console.log(this.IsCookieExists);
    return true;
    }
    else
    {
    return false
    };
  }
}
