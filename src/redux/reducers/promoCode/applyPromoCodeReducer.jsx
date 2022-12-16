import {
    APPLY_PROMO_CODE_REQUEST,
    APPLY_PROMO_CODE_SUCCESS,
    APPLY_PROMO_CODE_FAILURE,
} from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const applyPromoCodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case APPLY_PROMO_CODE_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };
        case APPLY_PROMO_CODE_SUCCESS:
            return {
                loading: false,
                payload: action.payload,
                error: '',
            };
        case APPLY_PROMO_CODE_FAILURE:
            return {
                loading: false,
                payload: [],
                error: action.error,
            };
        default:
            return state;
    }
};

export default applyPromoCodeReducer;
