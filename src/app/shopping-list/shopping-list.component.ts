import { Component, OnInit, OnDestroy } from "@angular/core";
import { Ingredient } from "../models/ingredient.model";
import { ShoppingListService } from "../services/shopping-list.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private shoppingListUpdatedSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListUpdatedSub = this.shoppingListService.shoppingListUpdatedEvent.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy() {
    this.shoppingListUpdatedSub.unsubscribe();
  }

  onEdit(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
