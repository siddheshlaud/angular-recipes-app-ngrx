import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { AuthResponseData } from "../models/auth-response-data.model";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject, BehaviorSubject } from "rxjs";
import { User } from "../models/user.model";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  user: BehaviorSubject<User> = new BehaviorSubject<User>();
  token: string = null;
  tokenExpirationTimer: any = null;
  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=",
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(respData => {
          this.handleAuthentication(
            respData.email,
            respData.localId,
            respData.idToken,
            +respData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=",
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(respData => {
          this.handleAuthentication(
            respData.email,
            respData.localId,
            respData.idToken,
            +respData.expiresIn
          );
        })
      );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = "An Unknown error occured!";

    if (!errorRes.error || !errorRes.error) {
      return throwError(errorMsg);
    }

    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMsg = "The email address is already in use by another account.";
        break;
      case "OPERATION_NOT_ALLOWED":
        errorMsg = "Password sign-in is disabled for this project.";
        break;
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        errorMsg =
          "We have blocked all requests from this device due to unusual activity. Try again later.";
        break;
      case "EMAIL_NOT_FOUND":
        errorMsg =
          "There is no user record corresponding to this identifier. The user may have been deleted.";
        break;
      case "INVALID_PASSWORD":
        errorMsg = "The username/password is invalid";
        break;
      case "USER_DISABLED":
        errorMsg = "The user account has been disabled by an administrator.";
        break;
    }

    return throwError(errorMsg);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000); // respData.expiresIn is in secs
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem("user", JSON.stringify(user));
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("user"));
    
    if (!userData) {
      return;
    }
    
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    
    if(loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration)
    }
    
  }

  logout() {
    localStorage.removeItem("user");
    this.user.next(null);
    this.router.navigate(["/auth"]);

    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout( () => {
      this.logout()
    }, expirationDuration);
  }
}
