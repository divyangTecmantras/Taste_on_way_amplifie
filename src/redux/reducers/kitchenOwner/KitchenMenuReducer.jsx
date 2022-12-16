import {
    GET_KITCHEN_MENU_REQUEST,
    GET_KITCHEN_MENU_SUCCESS,
    GET_KITCHEN_MENU_FAILURE,
} from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const kitchenMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_KITCHEN_MENU_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };
        case GET_KITCHEN_MENU_SUCCESS:
            return {
                loading: false,
                payload: action.payload,
                error: '',
            };
        case GET_KITCHEN_MENU_FAILURE:
            return {
                loading: false,
                payload: [],
                error: action.error,
            };
        default:
            return state;
    }
};

export default kitchenMenuReducer;
