import {
    GET_TOP_FIVE_RESTAURANTS_REQUEST,
    GET_TOP_FIVE_RESTAURANTS_SUCCESS,
    GET_TOP_FIVE_RESTAURANTS_FAILURE,
} from '../../types/types';
import { postApi } from '../../api';

export const topFiveRestaurantsListRequest = () => ({
    type: GET_TOP_FIVE_RESTAURANTS_REQUEST,
});
export const topFiveRestaurantsListSuccess = (payload) => ({
    type: GET_TOP_FIVE_RESTAURANTS_SUCCESS,
    payload,
});
export const topFiveRestaurantsListFailure = (error) => ({
    type: GET_TOP_FIVE_RESTAURANTS_FAILURE,
    error,
});

export const fetchTopFiveRestaurantsList = (data) => async (dispatch) => {
    dispatch(topFiveRestaurantsListRequest());
    return postApi(`get-mostpopular-kitchen-owner`, data)
        .then((res) => {
            dispatch(topFiveRestaurantsListSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(topFiveRestaurantsListFailure(e));
        });
};
