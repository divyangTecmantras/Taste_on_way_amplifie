import {
    CANCEL_ORDER_REQUEST,
    CANCEL_ORDER_SUCCESS,
    CANCEL_ORDER_FAILURE,
} from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const cancelOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CANCEL_ORDER_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };
        case CANCEL_ORDER_SUCCESS:
            return {
                loading: false,
                payload: action.payload,
                error: '',
            };
        case CANCEL_ORDER_FAILURE:
            return {
                loading: false,
                payload: [],
                error: action.error,
            };
        default:
            return state;
    }
};

export default cancelOrderReducer;
