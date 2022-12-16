import {
    GET_KITCHEN_OWNER_REVIEW_HISTORY_SUCCESS,
    GET_KITCHEN_OWNER_REVIEW_HISTORY_REQUEST,
    GET_KITCHEN_OWNER_REVIEW_HISTORY_FAILURE,
} from '../../types/types';

import { postApi } from '../../api';

export const getKitchenOwnerReviewRequest = () => ({
    type: GET_KITCHEN_OWNER_REVIEW_HISTORY_REQUEST,
});
export const getKitchenOwnerReviewSuccess = (payload) => ({
    type: GET_KITCHEN_OWNER_REVIEW_HISTORY_SUCCESS,
    payload,
});
export const getKitchenOwnerReviewFailure = (error) => ({
    type: GET_KITCHEN_OWNER_REVIEW_HISTORY_FAILURE,
    error,
});

export const fetchKitchenOwnerReview = (data) => async (dispatch) => {
    dispatch(getKitchenOwnerReviewRequest());
    return postApi(`get-rating`, data)
        .then((res) => {
            dispatch(getKitchenOwnerReviewSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(getKitchenOwnerReviewFailure(e));
        });
};
