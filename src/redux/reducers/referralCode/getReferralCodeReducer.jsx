import {
    GET_REFERRAL_CODE_REQUEST,
    GET_REFERRAL_CODE_SUCCESS,
    GET_REFERRAL_CODE_FAILURE,
} from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const getReferralCodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REFERRAL_CODE_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };
        case GET_REFERRAL_CODE_SUCCESS:
            return {
                loading: false,
                payload: action.payload,
                error: '',
            };
        case GET_REFERRAL_CODE_FAILURE:
            return {
                loading: false,
                payload: [],
                error: action.error,
            };
        default:
            return state;
    }
};

export default getReferralCodeReducer;
