import { USER_INFO_REQUEST, USER_INFO_SUCCESS, USER_INFO_FAILURE } from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const userInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_INFO_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };
        case USER_INFO_SUCCESS:
            return {
                loading: false,
                payload: action.payload,
                error: '',
            };
        case USER_INFO_FAILURE:
            return {
                loading: false,
                payload: [],
                error: action.error,
            };
        default:
            return state;
    }
};

export default userInfoReducer;
