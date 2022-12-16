import {
    GET_ORDER_AGAIN_DETAILS_REQUEST,
    GET_ORDER_AGAIN_DETAILS_SUCCESS,
    GET_ORDER_AGAIN_DETAILS_FAILURE,
} from '../../types/types';
import { postApi } from '../../api';

export const orderAgainListRequest = () => ({
    type: GET_ORDER_AGAIN_DETAILS_REQUEST,
});
export const orderAgainListSuccess = (payload) => ({
    type: GET_ORDER_AGAIN_DETAILS_SUCCESS,
    payload,
});
export const orderAgainListFailure = (error) => ({
    type: GET_ORDER_AGAIN_DETAILS_FAILURE,
    error,
});

export const fetchOrderAgainList = (data) => async (dispatch) => {
    dispatch(orderAgainListRequest());
    return postApi(`get-order-again`, data)
        .then((res) => {
            dispatch(orderAgainListSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(orderAgainListFailure(e));
        });
};
