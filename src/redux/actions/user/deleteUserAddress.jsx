import {
    DELETE_USER_ADDRESS_REQUEST,
    DELETE_USER_ADDRESS_SUCCESS,
    DELETE_USER_ADDRESS_FAILURE,
} from '../../types/types';

import { postApi } from '../../api';

export const deleteAddresRequest = () => ({
    type: DELETE_USER_ADDRESS_REQUEST,
});

export const deleteAddresSuccess = (payload) => ({
    type: DELETE_USER_ADDRESS_SUCCESS,
    payload,
});

export const deleteAddressFailure = (error) => ({
    type: DELETE_USER_ADDRESS_FAILURE,
    error,
});

export const deleteUserAddress = (data) => async (dispatch) => {
    dispatch(deleteAddresRequest());
    return postApi(`delete-address`, data)
        .then((res) => {
            dispatch(deleteAddresSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(deleteAddressFailure(e));
        });
};
