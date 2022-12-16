import {
    GET_KITCHEN_MENU_REQUEST,
    GET_KITCHEN_MENU_SUCCESS,
    GET_KITCHEN_MENU_FAILURE,
} from '../../types/types';
import { postApi } from '../../api';

export const kitchenMenuRequest = () => ({
    type: GET_KITCHEN_MENU_REQUEST,
});

export const kitchenMenuSuccess = (payload) => ({
    type: GET_KITCHEN_MENU_SUCCESS,
    payload,
});

export const kitchenMenuFailure = (error) => ({
    type: GET_KITCHEN_MENU_FAILURE,
    error,
});

export const fetchKitchenMenu = (data) => async (dispatch) => {
    dispatch(kitchenMenuRequest());
    return postApi(`get-user-menu`, data)
        .then((res) => {
            dispatch(kitchenMenuSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(kitchenMenuFailure(e));
        });
};
