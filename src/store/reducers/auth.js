import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initState = {
    token : null,
    userId: null,
    error: null,
    loading: false,
    redirectPath : "/",
};

const authStart = (state) => updateObject(state, {error:null, loading: true});
const authSuccess = (state, action) => updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading:false
});
const authFail = (state, action) => updateObject(state, {
    loading: false,
    error: action.error
});

const logout = (state) => updateObject(state, { 
    token: null,
    userId: null,
});

const setAuthRedirect = (state, action) => updateObject(state, {
    redirectPath : action.path,
});

const reducer = (state = initState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return logout(state);
        case actionTypes.SET_AUTH_REDIRECT: return setAuthRedirect(state, action);
        default: return state;
    }
}

export default reducer;