const { SIGN_UP, LOGIN, GET_ROLE, LOGOUT, CHANGE_PASSWORD } = require("../constants/actionTypes");

const authReducer = (state = {authData: null, role: null}, action) => {
    switch(action.type){
        case SIGN_UP:
        case LOGIN:
            if(action?.payload.message == null){
                localStorage.setItem(
                    'user',
                    JSON.stringify(action?.payload)
                );
            }
            state = {...state, authData: action?.payload}
            console.log(state)
            return state;
        case LOGOUT:
            localStorage.removeItem('user');
            return {...state, authData: null, role: null};
        case GET_ROLE:
            const user = localStorage.getItem('user')
            if (user) {
                state = {...state, authData: action?.userInfo, role: action?.payload}
            }
            return state
        default:
            return state;
    }
}

export default authReducer;