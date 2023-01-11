import {
    CREATE_REFERRAL_CODE_REQUEST,
    CREATE_REFERRAL_CODE_SUCCESS,
    CREATE_REFERRAL_CODE_FAILURE,
} from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const createReferralCodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_REFERRAL_CODE_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };
        case CREATE_REFERRAL_CODE_SUCCESS:
            return {
                loading: false,
                payload: action.payload,
                error: '',
            };
        case CREATE_REFERRAL_CODE_FAILURE:
            return {
                loading: false,
                payload: [],
                error: action.error,
            };
        default:
            return state;
    }
};

export default createReferralCodeReducer;
