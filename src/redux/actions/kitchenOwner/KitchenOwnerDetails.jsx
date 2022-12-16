import {
    GET_KITCHEN_OWNER_DETAILS_REQUEST,
    GET_KITCHEN_OWNER_DETAILS_SUCCESS,
    GET_KITCHEN_OWNER_DETAILS_FAILURE,
} from '../../types/types';
import { postApi } from '../../api';

export const kitchenOwnerDetailsRequest = () => ({
    type: GET_KITCHEN_OWNER_DETAILS_REQUEST,
});
export const kitchenOwnerDetailsSuccess = (payload) => ({
    type: GET_KITCHEN_OWNER_DETAILS_SUCCESS,
    payload,
});
export const kitchenOwnerDetailsFailure = (error) => ({
    type: GET_KITCHEN_OWNER_DETAILS_FAILURE,
    error,
});

export const fetchKitchenOwnerDetails = (data) => async (dispatch) => {
    dispatch(kitchenOwnerDetailsRequest());
    return postApi(`get-kitchen-owner-details`, data)
        .then((res) => {
            dispatch(kitchenOwnerDetailsSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(kitchenOwnerDetailsFailure(e));
        });
};
