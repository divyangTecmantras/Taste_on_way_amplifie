import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
    USER_REGISTER_CLEAN,
} from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const registerUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };
        case USER_REGISTER_SUCCESS:
            return {
                loading: false,
                payload: action.payload,
                error: '',
            };
        case USER_REGISTER_FAILURE:
            return {
                loading: false,
                payload: [],
                error: action.error,
            };
        case USER_REGISTER_CLEAN:
            return {
                loading: false,
                payload: [],
                error: '',
            };
        default:
            return state;
    }
};

export default registerUserReducer;
