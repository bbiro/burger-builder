import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (state = initialState, action) => {
  let price = state.totalPrice;
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      price += INGREDIENT_PRICES[action.ingredientName];
      const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
      const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: +price,
      };
      return updateObject(state, updatedState);

    // return {
    //   ...state,
    //   ingredients: {
    //     ...state.ingredients,
    //     [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
    //   },
    //   totalPrice: +price,
    // };
    case actionTypes.REMOVE_INGREDIENT:
      price -= INGREDIENT_PRICES[action.ingredientName];
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: +price,
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        total_price: 4,
        error: false,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
        },
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
