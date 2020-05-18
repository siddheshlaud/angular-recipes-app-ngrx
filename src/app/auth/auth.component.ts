import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  OnDestroy
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Observable, Subscription } from "rxjs";
import { AuthResponseData } from "../models/auth-response-data.model";
import { Router } from "@angular/router";
import { AlertComponent } from "../alert/alert.component";
import { PlaceholderDirective } from "../placeholder.directive";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  private closeSub: Subscription;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value);
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      respData => {
        console.log(respData);
        this.isLoading = false;
        this.router.navigate(["/recipes"]);
      },
      errorMsg => {
        console.log(errorMsg);
        this.error = errorMsg;
        this.showErrorAlert(errorMsg);
        this.isLoading = false;
      }
    );

    form.reset();
  }

  private showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    //Angular needs the element reference that is linked to template element to display the AlertComponent
    //This is achieved using custom directive, as we can get the element ref over there
    //Element Ref is an object that allows to interact with the specific place in DOM
    const hostViewContainerRef: ViewContainerRef = this.alertHost
      .viewContainerRef;

    //This clears all the components that have been rendered over there
    hostViewContainerRef.clear();

    const component: AlertComponent = hostViewContainerRef.createComponent(
      alertCmpFactory
    );

    component.instance.message = message;

    this.closeSub = component.instance.closeDialog.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  onCloseAlert() {
    this.error = null;
  }
}
