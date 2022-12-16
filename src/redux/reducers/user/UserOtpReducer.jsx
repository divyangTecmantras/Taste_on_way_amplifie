import {
    USER_OTP_REQUEST,
    USER_OTP_SUCCESS,
    USER_OTP_FAILURE,
    USER_OTP_CLEAN,
} from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const userOtpReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_OTP_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };
        case USER_OTP_SUCCESS:
            return {
                loading: false,
                payload: action.payload,
                error: '',
            };
        case USER_OTP_FAILURE:
            return {
                loading: false,
                payload: [],
                error: action.error,
            };
        case USER_OTP_CLEAN:
            return {
                loading: false,
                payload: [],
                error: '',
            };
        default:
            return state;
    }
};

export default userOtpReducer;
