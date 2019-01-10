import * as reduxAction from '../actions/actionTypes';
import {updateObject} from '../../share/utility';

const INGREDIENTS_PRICES = {
	'salad' : 0.5,
	'bacon' : 1.12,
	'cheese': 0.8,
	'meat' : 1.5 
};

const initState = {
    ingredients:null,
    error: false,
    totalPrice: 2,
    building: false
}

const addIngredient = (state, action) => {
    const newIngredients = updateObject(state.ingredients, {
        [action.ingName]: state.ingredients[action.ingName] + 1
    });

    const newPrice = state.totalPrice + INGREDIENTS_PRICES[action.ingName];

    return updateObject(state,{
        ingredients: newIngredients, 
        totalPrice: newPrice,
        building: true });
}

const removeIngredient = (state, action) => {
    const newIngredients = updateObject(state.ingredients, {
        [action.ingName]: state.ingredients[action.ingName] - 1
    });
    
    const newPrice = state.totalPrice - INGREDIENTS_PRICES[action.ingName];

    return updateObject(state,{
        ingredients: newIngredients, 
        totalPrice: newPrice,
        building: true});
}

const setIngredients = (state, action) => {
    const newIngredients = updateObject(state.ingredients,{
        salad: action.ingredients.salad,
        meat: action.ingredients.meat,
        cheese: action.ingredients.cheese,
        bacon: action.ingredients.bacon
    });

    return updateObject(state, {
        ingredients: newIngredients,
        totalPrice: 2,
        error: false,
        building: false
    });
}

const fetchIngredientsFail = (state) => updateObject(state, {error: true});

const reducer = (state = initState, action) => {
    switch(action.type) {
        case reduxAction.ADD_INGREDIENT : return addIngredient(state, action);
        case reduxAction.REMOVE_INGREDIENT : return removeIngredient(state, action);
        case reduxAction.SET_INGREDIENTS: return setIngredients(state, action);
        case reduxAction.FETCH_INGREDIENTS_FAIL: return fetchIngredientsFail(state);
        default: return state;
    }
}

export default reducer;