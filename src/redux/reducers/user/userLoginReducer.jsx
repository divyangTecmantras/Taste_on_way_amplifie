import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGIN_CLEAN,
} from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const loginUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                payload: action.payload,
                error: '',
            };
        case USER_LOGIN_FAILURE:
            return {
                loading: false,
                payload: [],
                error: action.error,
            };
        case USER_LOGIN_CLEAN:
            return {
                loading: false,
                payload: [],
                error: '',
            };
        default:
            return state;
    }
};

export default loginUserReducer;
