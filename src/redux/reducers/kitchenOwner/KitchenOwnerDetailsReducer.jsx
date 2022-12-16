import {
    GET_KITCHEN_OWNER_DETAILS_REQUEST,
    GET_KITCHEN_OWNER_DETAILS_SUCCESS,
    GET_KITCHEN_OWNER_DETAILS_FAILURE,
} from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const kitchenOwnerDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_KITCHEN_OWNER_DETAILS_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };
        case GET_KITCHEN_OWNER_DETAILS_SUCCESS:
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

export default kitchenOwnerDetailsReducer;
