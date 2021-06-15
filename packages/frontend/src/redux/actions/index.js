import * as types from '../constants/ActionTypes';

export const setLogin = (userInfo, token) => {
    return {
        type: types.SET_LOGIN,
        userInfo,
        token
    }
}

export const updateReceivingList = (receivingList) => {
    return {
        type: types.UPDATE_RECEIVING_LIST,
        receivingList
    }
}