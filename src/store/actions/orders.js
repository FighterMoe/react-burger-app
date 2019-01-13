import * as actionTypes from './actionTypes';
import axios from '../../axios-order';
import { fetachIngredientsFail } from './burgerBuilder';

export const purchaseBurgerSuccess = (id, orders) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id: id,
        orders: orders  
    }
}

export const pruchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }
}

export const purchaseBurgerInit = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_INIT
    }
}

export const purchaseBurger = (orderData, idToken) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + idToken, orderData)
        .then(response => {
            console.log(response.data.name);
            console.log(orderData)
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        })
        .catch( error => {
            dispatch(pruchaseBurgerFail(error));
        });
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
}

export const fetachOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAIL,
    }
}

export const fetchOrders = (idToken, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + idToken +'&orderBy="userId"&equalTo="' + userId +'"';
        axios.get('/orders.json' + queryParams)
        .then( response => {
            const fetchData = [];
            for ( let key in response.data  ) {
                fetchData.push({ id: key, orders: response.data[key]});  
            }

            dispatch(fetachOrdersSuccess(fetchData));
        })
        .catch( error => {
            dispatch(fetachIngredientsFail());
        });
    }
}