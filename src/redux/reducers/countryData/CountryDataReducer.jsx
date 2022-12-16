import {
    COUNTRY_DATA_REQUEST,
    COUNTRY_DATA_SUCCESS,
    COUNTRY_DATA_FAILURE,
} from '../../types/types';

const initialState = {
    loading: false,
    payload: [],
    error: '',
};

const countryDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case COUNTRY_DATA_REQUEST:
            return {
                loading: true,
                payload: [],
                error: '',
            };
        case COUNTRY_DATA_SUCCESS:
            return {
                loading: false,
                payload: action.payload,
                error: '',
            };
        case COUNTRY_DATA_FAILURE:
            return {
                loading: false,
                payload: [],
                error: action.error,
            };
        default:
            return state;
    }
};

export default countryDataReducer;
