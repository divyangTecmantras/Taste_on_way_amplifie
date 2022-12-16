import {
    GET_KITCHEN_OWNER_REVIEW_HISTORY_REQUEST,
    GET_KITCHEN_OWNER_REVIEW_HISTORY_SUCCESS,
    GET_KITCHEN_OWNER_REVIEW_HISTORY_FAILURE,
} from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const KitchenOwnerReviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_KITCHEN_OWNER_REVIEW_HISTORY_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };
        case GET_KITCHEN_OWNER_REVIEW_HISTORY_SUCCESS:
            return {
                loading: false,
                payload: action.payload,
                error: '',
            };
        case GET_KITCHEN_OWNER_REVIEW_HISTORY_FAILURE:
            return {
                loading: false,
                payload: [],
                error: action.error,
            };
        default:
            return state;
    }
};

export default KitchenOwnerReviewReducer;
