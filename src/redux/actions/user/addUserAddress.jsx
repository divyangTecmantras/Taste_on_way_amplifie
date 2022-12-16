import {
    ADD_USER_ADDRESS_REQUEST,
    ADD_USER_ADDRESS_SUCCESS,
    ADD_USER_ADDRESS_FAILURE,
} from '../../types/types';
import { postApi } from '../../api';

export const addUserAddressRequest = () => ({
    type: ADD_USER_ADDRESS_REQUEST,
});

export const addUserAddressSuccess = (payload) => ({
    type: ADD_USER_ADDRESS_SUCCESS,
    payload,
});

export const addUserAddressFailure = (error) => ({
    type: ADD_USER_ADDRESS_FAILURE,
    error,
});

export const addUserAddress = (data) => async (dispatch) => {
    dispatch(addUserAddressRequest());
    return postApi(`create-or-update-address`, data)
        .then((res) => {
            dispatch(addUserAddressSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(addUserAddressFailure(e));
        });
};
