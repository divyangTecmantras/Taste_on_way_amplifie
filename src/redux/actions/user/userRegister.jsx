import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
    USER_REGISTER_CLEAN,
} from '../../types/types';
import { postApi } from '../../api';

export const registerUserRequest = () => ({
    type: USER_REGISTER_REQUEST,
});
export const registerUserSuccess = (payload) => ({
    type: USER_REGISTER_SUCCESS,
    payload,
});
export const registerUserFailure = (error) => ({
    type: USER_REGISTER_FAILURE,
    error,
});

export const userRegisterClean = () => ({
    type: USER_REGISTER_CLEAN,
});

export const fetchRegisterUser = (data) => async (dispatch) => {
    dispatch(registerUserRequest());
    return postApi(`register`, data)
        .then((res) => {
            dispatch(registerUserSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(registerUserFailure(e));
        });
};
