import {
    APPLY_PROMO_CODE_REQUEST,
    APPLY_PROMO_CODE_SUCCESS,
    APPLY_PROMO_CODE_FAILURE,
} from '../../types/types';
import { postApi } from '../../api';
import { setItem } from '../../../utils/utils';

export const applyPromoCodeRequest = () => ({
    type: APPLY_PROMO_CODE_REQUEST,
});
export const applyPromoCodeSuccess = (payload) => ({
    type: APPLY_PROMO_CODE_SUCCESS,
    payload,
});
export const applyPromoCodeFailure = (error) => ({
    type: APPLY_PROMO_CODE_FAILURE,
    error,
});

export const fetchApplyPromoCode = (data) => async (dispatch) => {
    dispatch(applyPromoCodeRequest());
    return postApi(`apply-promo-code`, data)
        .then((res) => {
            dispatch(applyPromoCodeSuccess(res.data));
            setItem('appliedCoupon', JSON.stringify(res.data.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(applyPromoCodeFailure(e));
        });
};
