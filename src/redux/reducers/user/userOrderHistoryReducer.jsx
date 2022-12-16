import {
    USER_ORDER_HISTORY_REQUEST,
    USER_ORDER_HISTORY_SUCCESS,
    USER_ORDER_HISTORY_FAILURE,
} from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const userOrderHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_ORDER_HISTORY_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };

        case USER_ORDER_HISTORY_SUCCESS:
            return {
                loading: false,
                payload: action.payload,
                error: '',
            };

        case USER_ORDER_HISTORY_FAILURE:
            return {
                loading: false,
                payload: [],
                error: action.error,
            };
        default:
            return state;
    }
};

export default userOrderHistoryReducer;
