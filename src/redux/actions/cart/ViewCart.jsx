import { VIEW_CART_REQUEST, VIEW_CART_SUCCESS, VIEW_CART_FAILURE } from '../../types/types';
import { postApi } from '../../api';
import { setItem } from '../../../utils/utils';

export const viewCartRequest = () => ({
    type: VIEW_CART_REQUEST,
});
export const viewCartSuccess = (payload) => ({
    type: VIEW_CART_SUCCESS,
    payload,
});
export const viewCartFailure = (error) => ({
    type: VIEW_CART_FAILURE,
    error,
});

export const fetchViewCart = (data) => async (dispatch) => {
    dispatch(viewCartRequest());
    return postApi(`view-cart`, data)
        .then((res) => {
            setItem('cartDetails', JSON.stringify(res.data));
            dispatch(viewCartSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(viewCartFailure(e));
        });
};
