import { ADD_TO_CART_PRODUCT, PRODUCT_INCREMENT, PRODUCT_DECREMENT } from '../../types/types';

const initialState = {
    loading: false,
    payload: '',
    id: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART_PRODUCT:
            return {
                loading: false,
                payload: action.payload,
                id: action.id,
            };
        case PRODUCT_INCREMENT:
            return {
                loading: false,
                payload: action.payload,
                id: action.id,
            };
        case PRODUCT_DECREMENT:
            return {
                loading: false,
                payload: action.payload,
                id: action.id,
            };
        default:
            return state;
    }
};

export default cartReducer;
