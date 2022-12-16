import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_CLEAN,
} from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const createOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                payload: action.payload,
                error: '',
            };
        case CREATE_ORDER_FAILURE:
            return {
                loading: false,
                payload: [],
                error: action.error,
            };
        case CREATE_ORDER_CLEAN:
            return {
                loading: false,
                payload: [],
                error: '',
            };
        default:
            return state;
    }
};

export default createOrderReducer;
