import {
    ADD_USER_ADDRESS_REQUEST,
    ADD_USER_ADDRESS_SUCCESS,
    ADD_USER_ADDRESS_FAILURE,
} from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const addUserAddressReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER_ADDRESS_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };
        case ADD_USER_ADDRESS_SUCCESS:
            return {
                loading: false,
                payload: action.payload,
                error: '',
            };
        case ADD_USER_ADDRESS_FAILURE:
            return {
                loading: false,
                payload: [],
                error: action.error,
            };
        default:
            return state;
    }
};

export default addUserAddressReducer;
