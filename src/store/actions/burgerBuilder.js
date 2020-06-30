import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName,
  };
};

export const removeIngredient = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName,
  };
};

export const setIngredients = (ingredients) => {
  // console.log('Set Ingredients' + ingredients);
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
    error: true,
  };
};

export const initIngredients = () => {
  // console.log('initIngredients');
  return (dispatch) => {
    axios
      .get('/ingredients.json')
      .then((response) => {
        //console.log('[burgerBuilder.js (action creator)] -> ' + response.data);
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        // console.log('[burgerBuilder.js (action creator)] catch -> ' + error);
        dispatch(fetchIngredientsFailed);
      });
  };
};
