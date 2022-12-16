import {
    GET_KITCHEN_OWNER_REQUEST,
    GET_KITCHEN_OWNER_SUCCESS,
    GET_KITCHEN_OWNER_FAILURE,
} from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const kitchenOwnerListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_KITCHEN_OWNER_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };
        case GET_KITCHEN_OWNER_SUCCESS:
            return {
                loading: false,
                payload: action.payload,
                error: '',
            };
        case GET_KITCHEN_OWNER_FAILURE:
            return {
                loading: false,
                payload: [],
                error: action.error,
            };
        default:
            return state;
    }
};

export default kitchenOwnerListReducer;
