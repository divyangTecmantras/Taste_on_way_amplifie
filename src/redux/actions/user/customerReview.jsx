import {
    CUSTOMER_REVIEW_REQUEST,
    CUSTOMER_REVIEW_SUCCESS,
    CUSTOMER_REVIEW_FAILURE,
} from '../../types/types';
import { postApi } from '../../api';

export const customerReviewRequest = () => ({
    type: CUSTOMER_REVIEW_REQUEST,
});

export const customerReviewSuccess = (payload) => ({
    type: CUSTOMER_REVIEW_SUCCESS,
    payload,
});

export const customerReviewFailure = (error) => ({
    type: CUSTOMER_REVIEW_FAILURE,
    error,
});

export const addCustomerReview = (data) => async (dispatch) => {
    dispatch(customerReviewRequest());
    return postApi(`create-user-feedback`, data)
        .then((res) => {
            dispatch(customerReviewSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(customerReviewFailure(e));
        });
};
