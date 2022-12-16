import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_CLEAN,
} from '../../types/types';
import { postApi } from '../../api';
import { setItem } from '../../../utils/utils';

export const createOrderRequest = () => ({
    type: CREATE_ORDER_REQUEST,
});
export const createOrderSuccess = (payload) => ({
    type: CREATE_ORDER_SUCCESS,
    payload,
});
export const createOrderFailure = (error) => ({
    type: CREATE_ORDER_FAILURE,
    error,
});

export const createOrderClean = () => ({
    type: CREATE_ORDER_CLEAN,
});

export const fetchCreateOrder = (data) => async (dispatch) => {
    dispatch(createOrderRequest());
    return postApi(`create-order`, data)
        .then((res) => {
            dispatch(createOrderSuccess(res.data));
            setItem('orderID', res.data.data.order_id);
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(createOrderFailure(e));
        });
};
