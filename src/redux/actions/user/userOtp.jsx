import {
    USER_OTP_REQUEST,
    USER_OTP_SUCCESS,
    USER_OTP_FAILURE,
    USER_OTP_CLEAN,
} from '../../types/types';
import { postApi } from '../../api';

export const userOtpRequest = () => ({
    type: USER_OTP_REQUEST,
});
export const userOtpSuccess = (payload) => ({
    type: USER_OTP_SUCCESS,
    payload,
});
export const userOtpFailure = (error) => ({
    type: USER_OTP_FAILURE,
    error,
});
export const userOtpClean = () => ({
    type: USER_OTP_CLEAN,
});

export const fetchUserOtp = (data) => async (dispatch) => {
    dispatch(userOtpRequest());
    return postApi(`verify-otp`, data)
        .then((res) => {
            dispatch(userOtpSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(userOtpFailure(e));
        });
};
