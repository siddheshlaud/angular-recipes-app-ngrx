import { Action } from "@ngrx/store";
import { Ingredient } from "../../models/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";
import { defaultThrottleConfig } from "rxjs/internal-compatibility";

const initialState = {
  ingredients: [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)]
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.AddIngredientAction
) {
  // = initialState gives default value
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      //State changes should be immutable. That is we should not change the exiting object.
      //Rather create a clone, then modify the clone and return the clone.
      return {
        ...state, //Spread operator to copy all the properties from previous state
        ingredients: [
          ...state.ingredients, //Copy all the previous ingredients
          action.payload
        ]
      };
      break;

    default:
      //While initializing Angular sends 1st param as null. So it will get assigned initialState
      //Hoever the action type will be different (NOT ShoppingListActions.ADD_INGREDIENT). So default case will return the value
      return state; //contains initialState;
  }
}
