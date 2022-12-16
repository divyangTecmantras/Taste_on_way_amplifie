import {
    GET_KITCHEN_OWNER_MENU_LIST_REQUEST,
    GET_KITCHEN_OWNER_MENU_LIST_SUCCESS,
    GET_KITCHEN_OWNER_MENU_LIST_FAILURE,
} from '../../types/types';
import { postApi } from '../../api';
// import { kitchenOwnerMenuItemListClean } from './KitchenOwnerMenuItemList';

export const kitchenOwnerMenuListRequest = () => ({
    type: GET_KITCHEN_OWNER_MENU_LIST_REQUEST,
});
export const kitchenOwnerMenuListSuccess = (payload) => ({
    type: GET_KITCHEN_OWNER_MENU_LIST_SUCCESS,
    payload,
});
export const kitchenOwnerMenuListFailure = (error) => ({
    type: GET_KITCHEN_OWNER_MENU_LIST_FAILURE,
    error,
});

export const fetchKitchenOwnerMenuList = (data) => async (dispatch) => {
    dispatch(kitchenOwnerMenuListRequest());
    return postApi(`get-user-menu`, data)
        .then((res) => {
            // dispatch(kitchenOwnerMenuItemListClean());
            dispatch(kitchenOwnerMenuListSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(kitchenOwnerMenuListFailure(e));
        });
};
