import {
    CREATE_ORDER_TRANSACTION_REQUEST,
    CREATE_ORDER_TRANSACTION_SUCCESS,
    CREATE_ORDER_TRANSACTION_FAILURE,
} from '../../types/types';
import { postApi } from '../../api';
import { removeItem } from '../../../utils/utils';

export const createOrderTransactionRequest = () => ({
    type: CREATE_ORDER_TRANSACTION_REQUEST,
});
export const createOrderTransactionSuccess = (payload) => ({
    type: CREATE_ORDER_TRANSACTION_SUCCESS,
    payload,
});
export const createOrderTransactionFailure = (error) => ({
    type: CREATE_ORDER_TRANSACTION_FAILURE,
    error,
});

export const fetchCreateOrderTransaction = (data) => async (dispatch) => {
    dispatch(createOrderTransactionRequest());
    return postApi(`create-order-transaction`, data)
        .then((res) => {
            removeItem('cartData');
            dispatch(createOrderTransactionSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(createOrderTransactionFailure(e));
        });
};
