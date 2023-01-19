import { getApi } from '../../api';
import {
    CREATE_REFERRAL_CODE_REQUEST,
    CREATE_REFERRAL_CODE_SUCCESS,
    CREATE_REFERRAL_CODE_FAILURE,
} from '../../types/types';

export const createReferralCodeRequest = () => ({
    type: CREATE_REFERRAL_CODE_REQUEST,
});
export const createReferralCodeSuccess = (payload) => ({
    type: CREATE_REFERRAL_CODE_SUCCESS,
    payload,
});
export const createReferralCodeFailure = (error) => ({
    type: CREATE_REFERRAL_CODE_FAILURE,
    error,
});

export const fetchCreateReferralCode = () => async (dispatch) => {
    dispatch(createReferralCodeRequest());
    return getApi(`generate-code`)
        .then((res) => {
            dispatch(createReferralCodeSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(createReferralCodeFailure(e));
        });
};
