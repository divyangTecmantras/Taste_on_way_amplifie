import {
    UPDATE_USER_INFO_REQUEST,
    UPDATE_USER_INFO_SUCCESS,
    UPDATE_USER_INFO_FAILURE,
} from '../../types/types';

import { postApi } from '../../api';

export const updateUserInfoRequest = () => ({
    type: UPDATE_USER_INFO_REQUEST,
});

export const updateUserInfoSuccess = (payload) => ({
    type: UPDATE_USER_INFO_SUCCESS,
    payload,
});

export const updateUserInfoFailure = (error) => ({
    type: UPDATE_USER_INFO_FAILURE,
    error,
});

export const updateUserProfile = (data) => async (dispatch) => {
    dispatch(updateUserInfoRequest());
    return postApi(`update-user-profile`, data)
        .then((res) => {
            dispatch(updateUserInfoSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(updateUserInfoFailure(e));
        });
};
