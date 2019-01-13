import * as actionTypes from '../actions/actionTypes';
import reducer from './auth';

describe("Authentication Reducer State", () => {
    it("Inital state condition test", () => {
        expect(reducer(undefined, {})).toEqual({
            token : null,
            userId: null,
            error: null,
            loading: false,
            redirectPath : "/",
        });
    });

    it("Successful authentication test", () => {
        expect(reducer({
            token : null,
            userId: null,
            error: null,
            loading: false,
            redirectPath : "/",
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: "some-token",
            userId: "some-user-id"
        })).toEqual({
            token : "some-token",
            userId: "some-user-id",
            error: null,
            loading: false,
            redirectPath : "/",
        });
    });
});