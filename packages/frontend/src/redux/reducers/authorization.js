import * as types from '../constants/ActionTypes';

let initialState = {
    isLogin: false,
    token: "",
    userInfo: {}
};

if(sessionStorage && sessionStorage.getItem('token') && sessionStorage.getItem('userInfo'))
    initialState = {
        isLogin: true,
        token: sessionStorage.getItem('token'),
        userInfo: sessionStorage.getItem('userInfo')
    };

let reducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SET_LOGIN: 
            return {
                ...state,
                isLogin: true,
                token: action.token,
                userInfo: action.userInfo
            };
        default:
            return state;
    }
}

export default reducer;