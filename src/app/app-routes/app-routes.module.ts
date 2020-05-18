import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShoppingListComponent } from "../shopping-list/shopping-list.component";
import { AuthComponent } from "../auth/auth.component";
import { AuthGuard } from "../auth/auth.guard";

const appRoutes: Routes = [
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  { path: "auth", component: AuthComponent },
  {
    path: "recipes",
    loadChildren: () =>
      import("../recipes/recipes.module").then(m => m.RecipesModule)
  },
  {
    path: "shopping-list",
    loadChildren: () =>
      import("../shopping-list/shopping-list.module").then(m => m.ShoppingListModule)
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutesModule {}
