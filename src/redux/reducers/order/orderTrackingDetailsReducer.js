import {
    GET_ORDER_DETAILS_FAILURE,
    GET_ORDER_DETAILS_REQUEST,
    GET_ORDER_DETAILS_SUCCESS,
    GET_DELIVERY_PERSON_LOCATION_DETAILS_FAILURE,
    GET_DELIVERY_PERSON_LOCATION_DETAILS_SUCCESS,
} from '../../types/types';

const initialState = {
    loading: false,
    orderDetails: { payload: [], error: '' },
    deliveryPersonLocation: { payload: [], error: '' },
};

const orderTrackingDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                orderDetails: { payload: [], error: '' },
                deliveryPersonLocation: { loading: false, deliveryPersonLocation: null, error: '' },
            };
        case GET_ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                orderDetails: { loading: false, orderDetails: action.payload, error: '' },
            };
        case GET_ORDER_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                orderDetails: {
                    payload: [],
                    error: action.error,
                },
            };
        case GET_DELIVERY_PERSON_LOCATION_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                deliveryPersonLocation: {
                    loading: false,
                    deliveryPersonLocation: action.payload,
                    error: '',
                },
            };
        case GET_DELIVERY_PERSON_LOCATION_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                deliveryPersonLocation: {
                    payload: [],
                    error: action.error,
                    deliveryPersonLocation: null,
                },
            };
        default:
            return state;
    }
};

export default orderTrackingDetailsReducer;
