import { VIEW_CART_REQUEST, VIEW_CART_SUCCESS, VIEW_CART_FAILURE } from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const viewCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case VIEW_CART_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };
        case VIEW_CART_SUCCESS:
            return {
                loading: false,
                payload: action.payload,
                error: '',
            };
        case VIEW_CART_FAILURE:
            return {
                loading: false,
                payload: [],
                error: action.error,
            };
        default:
            return state;
    }
};

export default viewCartReducer;
