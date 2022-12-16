import {
    CUSTOMER_SUPPORT_REQUEST,
    CUSTOMER_SUPPORT_SUCCESS,
    CUSTOMER_SUPPORT_FAILURE,
} from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const customerSupportReducer = (state = initialState, action) => {
    switch (action.type) {
        case CUSTOMER_SUPPORT_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };
        case CUSTOMER_SUPPORT_SUCCESS:
            return {
                loading: false,
                payload: action.payload,
                error: '',
            };
        case CUSTOMER_SUPPORT_FAILURE:
            return {
                loading: false,
                payload: [],
                error: action.error,
            };
        default:
            return state;
    }
};

export default customerSupportReducer;
