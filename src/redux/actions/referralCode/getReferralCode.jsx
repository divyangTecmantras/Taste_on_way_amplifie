import { getApi } from '../../api';
import {
    GET_REFERRAL_CODE_REQUEST,
    GET_REFERRAL_CODE_SUCCESS,
    GET_REFERRAL_CODE_FAILURE,
} from '../../types/types';

export const getReferralCodeRequest = () => ({
    type: GET_REFERRAL_CODE_REQUEST,
});
export const getReferralCodeSuccess = (payload) => ({
    type: GET_REFERRAL_CODE_SUCCESS,
    payload,
});
export const getReferralCodeFailure = (error) => ({
    type: GET_REFERRAL_CODE_FAILURE,
    error,
});

export const fetchgetReferralCode = () => async (dispatch) => {
    dispatch(getReferralCodeRequest());
    return getApi(`get-referral-code`)
        .then((res) => {
            dispatch(getReferralCodeSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(getReferralCodeFailure(e));
        });
};
