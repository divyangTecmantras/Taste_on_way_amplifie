import {
    SET_USER_ADDRESS_REQUEST,
    SET_USER_ADDRESS_SUCCESS,
    SET_USER_ADDRESS_FAILURE,
} from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const setUserAddressReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_ADDRESS_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };
        case SET_USER_ADDRESS_SUCCESS:
            return {
                loading: false,
                payload: action.payload,
                error: '',
            };
        case SET_USER_ADDRESS_FAILURE:
            return {
                loading: false,
                payload: [],
                error: action.error,
            };
        default:
            return state;
    }
};

export default setUserAddressReducer;
