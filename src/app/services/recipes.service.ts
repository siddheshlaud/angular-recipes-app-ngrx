import { Injectable, OnInit, EventEmitter } from "@angular/core";
import { Recipe } from "../models/recipe.model";
import { Ingredient } from "../models/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Subject } from "rxjs";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";

@Injectable({
  providedIn: "root"
})
export class RecipesService implements OnInit {
  recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();
  /*private recipes: Recipe[] = [
    new Recipe(
      "Gajar Ka Halwa",
      "A Desert recipe",
      "https://live.staticflickr.com/5496/31479301445_cb53c0f4e9_b.jpg",
      [
        new Ingredient("Carrot", 5),
        new Ingredient("Milk", 2),
        new Ingredient("Sugar", 2),
        new Ingredient("Khoya", 1),
        new Ingredient("Dry Fruits", 3)
      ]
    ),
    new Recipe(
      "Walnut Salad",
      "Light and healthy",
      "https://images.pexels.com/photos/1646711/pexels-photo-1646711.jpeg",
      [
        new Ingredient("Wanuts", 20),
        new Ingredient("Cheery Tomatoes", 10),
        new Ingredient("Spinach", 5)
      ]
    )
  ];*/

  private recipes: Recipes[] = [];

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}

  ngOnInit() {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    //this.shoppingListService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredientsAction(ingredients));
  }
}
