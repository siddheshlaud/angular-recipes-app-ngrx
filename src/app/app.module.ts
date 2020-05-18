import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { DropdownDirective } from "./directives/dropdown.directive";
import { AppRoutesModule } from "./app-routes/app-routes.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataStorageService } from "./services/data-storage.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RecipesResolverService } from "./services/recipes-resolver.service";
import { AuthComponent } from "./auth/auth.component";
import { AuthService } from "./services/auth.service";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { RecipesService } from "./services/recipes.service";
import { ShoppingListService } from "./services/shopping-list.service";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { AuthGuard } from "./auth/auth.guard";
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './placeholder.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    DataStorageService,
    RecipesResolverService,
    AuthService,
    RecipesService,
    ShoppingListService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],

  bootstrap: [AppComponent],

  entryComponents: [AlertComponent]
})
export class AppModule {}
