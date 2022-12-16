import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGIN_CLEAN,
} from '../../types/types';
import { postApi } from '../../api';

export const loginUserRequest = () => ({
    type: USER_LOGIN_REQUEST,
});
export const loginUserSuccess = (payload) => ({
    type: USER_LOGIN_SUCCESS,
    payload,
});
export const loginUserFailure = (error) => ({
    type: USER_LOGIN_FAILURE,
    error,
});
export const userLoginClean = () => ({
    type: USER_LOGIN_CLEAN,
});

export const fetchLoginUser = (data) => async (dispatch) => {
    dispatch(loginUserRequest());
    return postApi(`login`, data)
        .then((res) => {
            dispatch(loginUserSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(loginUserFailure(e));
        });
};
