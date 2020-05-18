import { Action } from "@ngrx/store";
import { Ingredient } from "../../models/ingredient.model";

export const ADD_INGREDIENT = "ADD_INGREDIENT";

export class AddIngredientAction implements Action {
  //type is mandatory
  readonly type = ADD_INGREDIENT; //readonly is to tell TS code that this cannof be modified from outside

  //ingredient to add. This can be named anything like ingredient/payload/data
  constructor(public payload: Ingredient) {}
}
