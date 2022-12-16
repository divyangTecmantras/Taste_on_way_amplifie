import {
    GET_KITCHEN_OWNER_MENU_ITEM_LIST_REQUEST,
    GET_KITCHEN_OWNER_MENU_ITEM_LIST_SUCCESS,
    GET_KITCHEN_OWNER_MENU_ITEM_LIST_FAILURE,
    GET_KITCHEN_OWNER_MENU_ITEM__LIST_CLEAN,
} from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const kitchenOwnerMenuItemListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_KITCHEN_OWNER_MENU_ITEM_LIST_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };
        case GET_KITCHEN_OWNER_MENU_ITEM_LIST_SUCCESS:
            return {
                loading: false,
                payload: action.payload,
                error: '',
            };
        case GET_KITCHEN_OWNER_MENU_ITEM_LIST_FAILURE:
            return {
                loading: false,
                payload: [],
                error: action.error,
            };
        case GET_KITCHEN_OWNER_MENU_ITEM__LIST_CLEAN:
            return {
                loading: false,
                payload: [],
                error: '',
            };
        default:
            return state;
    }
};

export default kitchenOwnerMenuItemListReducer;
