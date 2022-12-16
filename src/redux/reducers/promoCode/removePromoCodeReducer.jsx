import {
    REMOVE_PROMO_CODE_REQUEST,
    REMOVE_PROMO_CODE_SUCCESS,
    REMOVE_PROMO_CODE_FAILURE,
} from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const removePromoCodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case REMOVE_PROMO_CODE_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };
        case REMOVE_PROMO_CODE_SUCCESS:
            return {
                loading: false,
                payload: action.payload,
                error: '',
            };
        case REMOVE_PROMO_CODE_FAILURE:
            return {
                loading: false,
                payload: [],
                error: action.error,
            };
        default:
            return state;
    }
};

export default removePromoCodeReducer;
