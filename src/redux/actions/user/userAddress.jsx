import {
    GET_USER_ADDRESS_REQUEST,
    GET_USER_ADDRESS_SUCCESS,
    GET_USER_ADDRESS_FAILURE,
    SET_USER_ADDRESS,
} from '../../types/types';
import { getApi } from '../../api';

export const userAddresRequest = () => ({
    type: GET_USER_ADDRESS_REQUEST,
});

export const userAddressSuccess = (payload) => ({
    type: GET_USER_ADDRESS_SUCCESS,
    payload,
});

export const userAddressFailure = (error) => ({
    type: GET_USER_ADDRESS_FAILURE,
    error,
});
export const setUserAddress = (data) => ({
    type: SET_USER_ADDRESS,
    data,
});
export const fetchUserAddress = () => async (dispatch) => {
    dispatch(userAddresRequest());
    return getApi(`get-addresses`)
        .then((res) => {
            dispatch(userAddressSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(userAddressFailure(e));
        });
};
