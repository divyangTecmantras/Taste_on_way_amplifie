import {
    GET_ORDER_DETAILS_FAILURE,
    GET_ORDER_DETAILS_SUCCESS,
    GET_ORDER_DETAILS_REQUEST,
    GET_DELIVERY_PERSON_LOCATION_DETAILS_SUCCESS,
    GET_DELIVERY_PERSON_LOCATION_DETAILS_FAILURE,
} from '../../redux/types/types';
import { postApi } from '../../redux/api';

export const getOrderDetailsRequest = () => ({
    type: GET_ORDER_DETAILS_REQUEST,
});
export const getOrderDetailsSuccess = (payload) => {
    return {
        type: GET_ORDER_DETAILS_SUCCESS,
        payload,
    };
};
export const getOrderDetailsFailure = (error) => ({
    type: GET_ORDER_DETAILS_FAILURE,
    error,
});

export const fetchCreateOrderDetails = (payload) => async (dispatch) => {
    dispatch(getOrderDetailsRequest());
    return postApi(`get-user-order`, payload)
        .then((res) => {
            dispatch(getOrderDetailsSuccess(res.data.data));
            return res ?? res?.data ?? res?.data ?? null;
        })
        .catch((e) => {
            dispatch(getOrderDetailsFailure(e));
        });
};

/**
API to get Delevery Person details like location and status
 */

export const getdeliveryPersonLocationSuccess = (payload) => {
    return {
        type: GET_DELIVERY_PERSON_LOCATION_DETAILS_SUCCESS,
        payload,
    };
};
export const getDeliveryPersonLocationFailure = (error) => ({
    type: GET_DELIVERY_PERSON_LOCATION_DETAILS_FAILURE,
    error,
});

export const fetchDeliveryPersonLocation = (payload) => async (dispatch) => {
    return postApi(`get-delivery-person-location-data`, payload)
        .then((res) => {
            dispatch(getdeliveryPersonLocationSuccess(res.data.data));
            return res ?? res?.data ?? res?.data ?? null;
        })
        .catch((e) => {
            dispatch(getDeliveryPersonLocationFailure(e));
        });
};
