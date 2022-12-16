import {
    GET_KITCHEN_OWNER_MENU_ITEM_LIST_REQUEST,
    GET_KITCHEN_OWNER_MENU_ITEM_LIST_SUCCESS,
    GET_KITCHEN_OWNER_MENU_ITEM_LIST_FAILURE,
    GET_KITCHEN_OWNER_MENU_ITEM__LIST_CLEAN,
} from '../../types/types';
import { postApi } from '../../api';

export const kitchenOwnerMenuItemListRequest = () => ({
    type: GET_KITCHEN_OWNER_MENU_ITEM_LIST_REQUEST,
});
export const kitchenOwnerMenuItemListSuccess = (payload) => ({
    type: GET_KITCHEN_OWNER_MENU_ITEM_LIST_SUCCESS,
    payload,
});
export const kitchenOwnerMenuItemListFailure = (error) => ({
    type: GET_KITCHEN_OWNER_MENU_ITEM_LIST_FAILURE,
    error,
});
export const kitchenOwnerMenuItemListClean = () => ({
    type: GET_KITCHEN_OWNER_MENU_ITEM__LIST_CLEAN,
});

export const fetchKitchenOwnerMenuItemList = (data) => async (dispatch) => {
    dispatch(kitchenOwnerMenuItemListRequest());
    return postApi(`get-user-menu-item`, data)
        .then((res) => {
            dispatch(kitchenOwnerMenuItemListSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(kitchenOwnerMenuItemListFailure(e));
        });
};
