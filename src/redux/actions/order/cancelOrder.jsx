import {
    CANCEL_ORDER_REQUEST,
    CANCEL_ORDER_SUCCESS,
    CANCEL_ORDER_FAILURE,
} from '../../types/types';
import { postApi } from '../../api';

export const cancelOrderRequest = () => ({
    type: CANCEL_ORDER_REQUEST,
});
export const cancelOrderSuccess = (payload) => ({
    type: CANCEL_ORDER_SUCCESS,
    payload,
});
export const cancelOrderFailure = (error) => ({
    type: CANCEL_ORDER_FAILURE,
    error,
});

export const fetchCancelOrder = (data) => async (dispatch) => {
    dispatch(cancelOrderRequest());
    return postApi(`update-order-status`, data)
        .then((res) => {
            dispatch(cancelOrderSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(cancelOrderFailure(e));
        });
};
