import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
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
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: +price,
      };
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
    default:
      return state;
  }
};

export default reducer;
