import { Action } from "@ngrx/store";
import { Ingredient } from "../../models/ingredient.model";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const ADD_INGREDIENTS = "ADD_INGREDIENTS";
export const UDPATE_INGREDIENT = "UDPATE_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";

export class AddIngredientAction implements Action {
  //type is mandatory
  readonly type = ADD_INGREDIENT; //readonly is to tell TS code that this cannot be modified from outside

  //ingredient to add. This can be named anything like ingredient/payload/data
  constructor(public payload: Ingredient) {}
}

export class AddIngredientsAction implements Action {
  //type is mandatory
  readonly type = ADD_INGREDIENTS; //readonly is to tell TS code that this cannot be modified from outside

  //ingredient to add. This can be named anything like ingredient/payload/data
  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredientAction implements Action {
  //type is mandatory
  readonly type = UDPATE_INGREDIENT; //readonly is to tell TS code that this cannot be modified from outside

  //ingredient to add. This can be named anything like ingredient/payload/data
  constructor(public index: number, public payload: Ingredient) {}
}

export class DeleteIngredientAction implements Action {
  //type is mandatory
  readonly type = DELETE_INGREDIENT; //readonly is to tell TS code that this cannot be modified from outside

  //ingredient to add. This can be named anything like ingredient/payload/data
  constructor(public index: number) {}
}

export type ShoppingListAllActions =
  | AddIngredientAction
  | AddIngredientsAction
  | UpdateIngredientAction
  | DeleteIngredientAction;
