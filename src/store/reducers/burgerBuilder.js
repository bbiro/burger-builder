import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const addIngredient = (state, action) => {
  let price = state.totalPrice;
  price += INGREDIENT_PRICES[action.ingredientName];
  const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: +price,
    building: true,
  };
  return updateObject(state, updatedState);
};

const removeIngredients = (state, action) => {
  let price = state.totalPrice;
  price -= INGREDIENT_PRICES[action.ingredientName];
  const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: +price,
    building: true,
  };
  return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
  const updatedState = {
    ingredients: action.ingredients,
    totalPrice: 4,
    building: false,
  };
  return updateObject(state, updatedState);
};

const fetchIngredientsFailed = (state, action) => {
  const updatedState = {
    ingredients: {
      ...state.ingredients,
    },
    error: true,
  };
  return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredients(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
