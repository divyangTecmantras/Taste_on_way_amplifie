import {
    UPDATE_USER_INFO_REQUEST,
    UPDATE_USER_INFO_SUCCESS,
    UPDATE_USER_INFO_FAILURE,
} from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const updateUserInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_INFO_REQUEST:
            return {
                loding: true,
                payload: [],
                error: '',
            };
        case UPDATE_USER_INFO_SUCCESS:
            return {
                loading: false,
                payload: action.payload,
                error: '',
            };
        case UPDATE_USER_INFO_FAILURE:
            return {
                loading: false,
                payload: [],
                error: action.error,
            };
        default:
            return state;
    }
};

export default updateUserInfoReducer;
