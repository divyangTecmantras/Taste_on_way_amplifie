import { getApi } from '../../api';
import {
    GET_PROMO_CODE_REQUEST,
    GET_PROMO_CODE_SUCCESS,
    GET_PROMO_CODE_FAILURE,
} from '../../types/types';

export const getPromoCodeRequest = () => ({
    type: GET_PROMO_CODE_REQUEST,
});
export const getPromoCodeSuccess = (payload) => ({
    type: GET_PROMO_CODE_SUCCESS,
    payload,
});
export const getPromoCodeFailure = (error) => ({
    type: GET_PROMO_CODE_FAILURE,
    error,
});

export const fetchGetPromoCodeData = () => async (dispatch) => {
    dispatch(getPromoCodeRequest());
    return getApi(`get-promo-codes`)
        .then((res) => {
            dispatch(getPromoCodeSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(getPromoCodeFailure(e));
        });
};
