import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START 
    }
}

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId 
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expireDate");
    localStorage.removeItem("userID");

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authLogout = (userTimeout) => {
    return dispatch => {
        setTimeout( () => {
            dispatch( logout() );
        },
        userTimeout * 1000);
    }
}

export const auth = (userEmail, password, isSingup) => {
    return dispatch => {
        dispatch(authStart());
        
        const authData = {
            email: userEmail,
            password: password,
            returnSecureToken: true
        }

        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA7Wj9Es5dF330ukftkTaRqlMPWW3cq49s";
        if(!isSingup) {
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA7Wj9Es5dF330ukftkTaRqlMPWW3cq49s";
        }

        axios.post( url , authData)
        .then( response => {
            const expiresIn = new Date( new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem("token", response.data.idToken);
            localStorage.setItem("expireDate", expiresIn);
            localStorage.setItem("userID", response.data.localId);

            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(authLogout(response.data.expiresIn))
        })
        .catch( error => {
            dispatch(authFail(error));
        });
    }
}

export const setAuthRedirect = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if(!token) {
            dispatch(logout());
        }else {
            const expireDate = new Date(localStorage.getItem("expireDate"));
            if(expireDate <= new Date()) {
                dispatch(logout());
            }else {
                const userID = localStorage.getItem("userID");
                dispatch(authSuccess(token, userID));
                dispatch(authLogout( (expireDate.getTime() - new Date().getTime()) / 1000 ));
            }
        }
    }
} 