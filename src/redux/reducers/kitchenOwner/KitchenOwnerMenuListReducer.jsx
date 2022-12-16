import {
    GET_KITCHEN_OWNER_MENU_LIST_REQUEST,
    GET_KITCHEN_OWNER_MENU_LIST_SUCCESS,
    GET_KITCHEN_OWNER_MENU_LIST_FAILURE,
} from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const kitchenOwnerMenuListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_KITCHEN_OWNER_MENU_LIST_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };
        case GET_KITCHEN_OWNER_MENU_LIST_SUCCESS:
            return {
                loading: false,
                payload: action.payload,
                error: '',
            };
        case GET_KITCHEN_OWNER_MENU_LIST_FAILURE:
            return {
                loading: false,
                payload: [],
                error: action.error,
            };
        default:
            return state;
    }
};

export default kitchenOwnerMenuListReducer;
