import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../share/utility';

const initState = {
    orders: [],
    loading: false,
    purchase: false,
}

const purchaseBurgerInit = (state) => updateObject(state, {purchase: false,});
const purchaseBurgerStart = (state) => updateObject(state, {loading: true});
const purchaseBurgerSuccess = (state, action) => {
    const newOrders = state.orders.concat({id: action.id, orders: action.orders}); 
    return updateObject(state,{orders: newOrders,loading: false,purchase: true})
};
const purchaseBurgerFail = (state) => updateObject(state, {loading: false});

const fetchOrdersStart = (state) => updateObject(state, {loading: true});
const fetchOrdersfail = (state) => updateObject(state, {loading: false});
const fetchOrdersSucssess = (state, action) => updateObject(state, {orders: action.orders, loading: false});

const reducer = (state = initState, action) => {
    switch(action.type){
        case actionTypes.PURCHASE_BURGER_INIT: return purchaseBurgerInit(state);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state);

        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSucssess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersfail(state);

        default: return state;
    }
}

export default  reducer;