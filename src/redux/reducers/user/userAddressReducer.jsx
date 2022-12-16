import {
    GET_USER_ADDRESS_REQUEST,
    GET_USER_ADDRESS_SUCCESS,
    GET_USER_ADDRESS_FAILURE,
    SET_USER_ADDRESS,
} from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
    data: '',
};

const userAddressReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_ADDRESS_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };
        case GET_USER_ADDRESS_SUCCESS:
            return {
                loading: false,
                payload: action.payload,
                error: '',
            };
        case GET_USER_ADDRESS_FAILURE:
            return {
                loading: false,
                payload: [],
                error: action.error,
            };
        case SET_USER_ADDRESS:
            return {
                loading: false,
                payload: state.payload,
                error: '',
                data: action.data,
            };
        default:
            return state;
    }
};

export default userAddressReducer;
