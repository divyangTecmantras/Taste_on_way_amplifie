import { ADD_TO_CART_PRODUCT, PRODUCT_INCREMENT, PRODUCT_DECREMENT } from '../../types/types';

export const addToCart = (payload, id) => {
    return {
        type: ADD_TO_CART_PRODUCT,
        payload,
        id,
    };
};
export const incrementQuantity = (payload, id) => {
    return {
        type: PRODUCT_INCREMENT,
        payload,
        id,
    };
};
export const decrementQuantity = (payload, id) => {
    return {
        type: PRODUCT_DECREMENT,
        payload,
        id,
    };
};
