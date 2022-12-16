import { USER_INFO_REQUEST, USER_INFO_SUCCESS, USER_INFO_FAILURE } from '../../types/types';
import { getApi } from '../../api';

export const userInfoRequest = () => ({
    type: USER_INFO_REQUEST,
});

export const userInfoSuccess = (payload) => ({
    type: USER_INFO_SUCCESS,
    payload,
});

export const userInfoFailure = (error) => ({
    type: USER_INFO_FAILURE,
    error,
});

export const fetchUserInfo = () => async (dispatch) => {
    dispatch(userInfoRequest());
    return getApi(`get-user-info`)
        .then((res) => {
            dispatch(userInfoSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })

        .catch((e) => {
            dispatch(userInfoFailure(e));
        });
};
