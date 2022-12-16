import {
    GET_TOP_FIVE_RESTAURANTS_REQUEST,
    GET_TOP_FIVE_RESTAURANTS_SUCCESS,
    GET_KITCHEN_OWNER_DETAILS_FAILURE,
} from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const topFiveRestaurantsListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TOP_FIVE_RESTAURANTS_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };
        case GET_TOP_FIVE_RESTAURANTS_SUCCESS:
            return {
                loading: false,
                payload: action.payload,
                error: '',
            };
        case GET_KITCHEN_OWNER_DETAILS_FAILURE:
            return {
                loading: false,
                payload: [],
                error: action.error,
            };
        default:
            return state;
    }
};

export default topFiveRestaurantsListReducer;
