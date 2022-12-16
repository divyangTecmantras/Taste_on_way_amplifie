import {
    CREATE_ORDER_DETAILS_REQUEST,
    CREATE_ORDER_DETAILS_SUCCESS,
    CREATE_ORDER_DETAILS_FAILURE,
} from '../../types/types';
import { postApi } from '../../api';
import { setItem } from '../../../utils/utils';

export const createOrderDetailsRequest = () => ({
    type: CREATE_ORDER_DETAILS_REQUEST,
});
export const createOrderDetailsSuccess = (payload) => ({
    type: CREATE_ORDER_DETAILS_SUCCESS,
    payload,
});
export const createOrderDetailsFailure = (error) => ({
    type: CREATE_ORDER_DETAILS_FAILURE,
    error,
});

export const fetchCreateOrderDetails = (data) => async (dispatch) => {
    dispatch(createOrderDetailsRequest());
    return postApi(`get-user-order`, data)
        .then((res) => {
            setItem('orderTime', JSON.stringify(res.data.data.time_for_incoming_order));
            dispatch(createOrderDetailsSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(createOrderDetailsFailure(e));
        });
};
