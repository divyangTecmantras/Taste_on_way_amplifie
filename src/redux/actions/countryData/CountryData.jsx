import { getApi } from '../../api';
import {
    COUNTRY_DATA_REQUEST,
    COUNTRY_DATA_SUCCESS,
    COUNTRY_DATA_FAILURE,
} from '../../types/types';

export const countryDataRequest = () => ({
    type: COUNTRY_DATA_REQUEST,
});
export const countryDataSuccess = (payload) => ({
    type: COUNTRY_DATA_SUCCESS,
    payload,
});
export const countryDataFailure = (error) => ({
    type: COUNTRY_DATA_FAILURE,
    error,
});

export const fetchCountryData = () => async (dispatch) => {
    dispatch(countryDataRequest());
    return getApi(`get-country`)
        .then((res) => {
            dispatch(countryDataSuccess(res.data));
            return res ?? res?.data ?? res?.data?.responseData ?? null;
        })
        .catch((e) => {
            dispatch(countryDataFailure(e));
        });
};
