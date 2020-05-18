import { Component, OnInit, OnDestroy } from "@angular/core";
import { Ingredient } from "../models/ingredient.model";
import { ShoppingListService } from "../services/shopping-list.service";
import { Subscription, Observable } from "rxjs";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients:Ingredient[]}>;
  private shoppingListUpdatedSub: Subscription;

  constructor(
              private shoppingListService: ShoppingListService,
              private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
               ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList') //returns Observable;
  }

  ngOnDestroy() {
    this.shoppingListUpdatedSub.unsubscribe();
  }

  onEdit(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
