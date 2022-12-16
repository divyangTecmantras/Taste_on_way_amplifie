import {
    REMOVE_PROMO_CODE_REQUEST,
    REMOVE_PROMO_CODE_SUCCESS,
    REMOVE_PROMO_CODE_FAILURE,
} from '../../types/types';
import { postApi } from '../../api';
import { removeItem } from '../../../utils/utils';

export const removePromoCodeRequest = () => ({
    type: REMOVE_PROMO_CODE_REQUEST,
});
export const removePromoCodeSuccess = (payload) => ({
    type: REMOVE_PROMO_CODE_SUCCESS,
    payload,
});
export const removePromoCodeFailure = (error) => ({
    type: REMOVE_PROMO_CODE_FAILURE,
    error,
});

export const fetchRemovePromoCode = (data) => async (dispatch) => {
    dispatch(removePromoCodeRequest());
    return postApi(`remove-promo-code`, data)
        .then((res) => {
            removeItem('appliedCoupon');
            dispatch(removePromoCodeSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(removePromoCodeFailure(e));
        });
};
