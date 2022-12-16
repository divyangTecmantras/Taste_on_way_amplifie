import {
    USER_ORDER_HISTORY_REQUEST,
    USER_ORDER_HISTORY_SUCCESS,
    USER_ORDER_HISTORY_FAILURE,
} from '../../types/types';
import { postApi } from '../../api';

export const userOrderHistoryreRequest = () => ({
    type: USER_ORDER_HISTORY_REQUEST,
});

export const userOrderHistorySuccess = (payload) => ({
    type: USER_ORDER_HISTORY_SUCCESS,
    payload,
});

export const userOrderHistoryFailure = (error) => ({
    type: USER_ORDER_HISTORY_FAILURE,
    error,
});

export const fetchUserOrderHistory = (data) => async (dispatch) => {
    dispatch(userOrderHistoryreRequest());
    return postApi(`order-history`, data)
        .then((res) => {
            dispatch(userOrderHistorySuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })

        .catch((e) => {
            dispatch(userOrderHistoryFailure(e));
        });
};
