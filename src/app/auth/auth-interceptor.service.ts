import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { take, exhaustMap } from "rxjs/operators";
import { User } from "../models/user.model";

@Injectable({providedIn: "root"})
export class AuthInterceptorService implements HttpInterceptor{
  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user: User) => {
        if(!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({params: new HttpParams().append("auth", user.token)});
        return next.handle(modifiedReq);
      })
    );
  }
}