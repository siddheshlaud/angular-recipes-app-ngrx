import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     return this.authService.user.pipe(
      take(1), // This will take latest user and unsubscribe. Instead of Guar listening to all user changes
      map(
      (user) => {
        const isAuth = !!user;
        if(isAuth) {
          return true;
        }
        return this.router.createUrlTree(["/auth"]);
      }
    ));
  }
}
