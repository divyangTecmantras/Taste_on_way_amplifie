import {
    GET_KITCHEN_OWNER_REQUEST,
    GET_KITCHEN_OWNER_SUCCESS,
    GET_KITCHEN_OWNER_FAILURE,
} from '../../types/types';
import { postApi } from '../../api';

export const kitchenOwnerListRequest = () => ({
    type: GET_KITCHEN_OWNER_REQUEST,
});
export const kitchenOwnerListSuccess = (payload) => ({
    type: GET_KITCHEN_OWNER_SUCCESS,
    payload,
});
export const kitchenOwnerListFailure = (error) => ({
    type: GET_KITCHEN_OWNER_FAILURE,
    error,
});

export const fetchKitchenOwnerList = (data) => async (dispatch) => {
    dispatch(kitchenOwnerListRequest());
    return postApi(`get-kitchen-owners`, data)
        .then((res) => {
            dispatch(kitchenOwnerListSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(kitchenOwnerListFailure(e));
        });
};
