import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";

const routes: Routes = [
  { path: "", component: ShoppingListComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule {}
