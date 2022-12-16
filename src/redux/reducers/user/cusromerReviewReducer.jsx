import {
    CUSTOMER_REVIEW_REQUEST,
    CUSTOMER_REVIEW_SUCCESS,
    CUSTOMER_REVIEW_FAILURE,
    CUSTOMER_SUPPORT_FAILURE,
} from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const customerReviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case CUSTOMER_REVIEW_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };
        case CUSTOMER_REVIEW_SUCCESS:
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

export default customerReviewReducer;
