import {
    GET_PROMO_CODE_REQUEST,
    GET_PROMO_CODE_SUCCESS,
    GET_PROMO_CODE_FAILURE,
} from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const getPromoCodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROMO_CODE_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };
        case GET_PROMO_CODE_SUCCESS:
            return {
                loading: false,
                payload: action.payload,
                error: '',
            };
        case GET_PROMO_CODE_FAILURE:
            return {
                loading: false,
                payload: [],
                error: action.error,
            };
        default:
            return state;
    }
};

export default getPromoCodeReducer;
