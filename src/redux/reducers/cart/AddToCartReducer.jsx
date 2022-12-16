import { ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAILURE } from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const addToCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };
        case ADD_TO_CART_SUCCESS:
            return {
                loading: false,
                payload: action.payload,
                error: '',
            };
        case ADD_TO_CART_FAILURE:
            return {
                loading: false,
                payload: [],
                error: action.error,
            };
        default:
            return state;
    }
};

export default addToCartReducer;
