import {
    CUSTOMER_SUPPORT_REQUEST,
    CUSTOMER_SUPPORT_SUCCESS,
    CUSTOMER_SUPPORT_FAILURE,
} from '../../types/types';

import { postApi } from '../../api';

export const customerSupportRequest = () => ({
    type: CUSTOMER_SUPPORT_REQUEST,
});
export const customerSupportSuccess = (payload) => ({
    type: CUSTOMER_SUPPORT_SUCCESS,
    payload,
});
export const customerSupportFailure = (error) => ({
    type: CUSTOMER_SUPPORT_FAILURE,
    error,
});

export const fetchCustomerSupport = (data) => async (dispatch) => {
    dispatch(customerSupportRequest());
    return postApi(`customer-support-ticket`, data)
        .then((res) => {
            dispatch(customerSupportSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(customerSupportFailure(e));
        });
};
