import {
    SET_USER_ADDRESS_REQUEST,
    SET_USER_ADDRESS_SUCCESS,
    SET_USER_ADDRESS_FAILURE,
} from '../../types/types';
import { postApi } from '../../api';

export const setUserAddresRequest = () => ({
    type: SET_USER_ADDRESS_REQUEST,
});

export const setUserAddressSuccess = (payload) => ({
    type: SET_USER_ADDRESS_SUCCESS,
    payload,
});

export const setUserAddressFailure = (error) => ({
    type: SET_USER_ADDRESS_FAILURE,
    error,
});

export const fetchsetUserAddress = (data) => async (dispatch) => {
    dispatch(setUserAddresRequest());
    return postApi(`set-default-address`, data)
        .then((res) => {
            dispatch(setUserAddressSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(setUserAddressFailure(e));
        });
};
