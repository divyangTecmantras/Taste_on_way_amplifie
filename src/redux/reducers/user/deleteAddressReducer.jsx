import {
    DELETE_USER_ADDRESS_REQUEST,
    DELETE_USER_ADDRESS_SUCCESS,
    DELETE_USER_ADDRESS_FAILURE,
} from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const deleteAddressReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_USER_ADDRESS_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };
        case DELETE_USER_ADDRESS_SUCCESS:
            return {
                loading: false,
                payload: action.payload,
                error: '',
            };
        case DELETE_USER_ADDRESS_FAILURE:
            return {
                loading: false,
                payload: [],
                error: action.error,
            };
        default:
            return state;
    }
};

export default deleteAddressReducer;
