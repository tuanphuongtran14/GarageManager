import * as types from '../constants/ActionTypes';

export const setLogin = (userInfo, token) => {
    return {
        type: types.SET_LOGIN,
        userInfo,
        token
    }
}