import { ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAILURE } from '../../types/types';
import { postApi } from '../../api';

export const addToCartRequest = () => ({
    type: ADD_TO_CART_REQUEST,
});
export const addToCartSuccess = (payload) => ({
    type: ADD_TO_CART_SUCCESS,
    payload,
});
export const addToCartFailure = (error) => ({
    type: ADD_TO_CART_FAILURE,
    error,
});

export const fetchAddToCart = (data) => async (dispatch) => {
    dispatch(addToCartRequest());
    return postApi(`add-to-user-cart`, data)
        .then((res) => {
            dispatch(addToCartSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(addToCartFailure(e));
        });
};
