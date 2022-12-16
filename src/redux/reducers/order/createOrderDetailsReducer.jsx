import {
    CREATE_ORDER_DETAILS_REQUEST,
    CREATE_ORDER_DETAILS_SUCCESS,
    CREATE_ORDER_DETAILS_FAILURE,
} from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const createOrderDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_DETAILS_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };
        case CREATE_ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                payload: action.payload,
                error: '',
            };
        case CREATE_ORDER_DETAILS_FAILURE:
            return {
                loading: false,
                payload: [],
                error: action.error,
            };
        default:
            return state;
    }
};

export default createOrderDetailsReducer;
