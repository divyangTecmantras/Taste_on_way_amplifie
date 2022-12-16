import axios from 'axios';
import config from '../utils/config';
import string from '../utils/string';
import { getItem } from '../utils/utils';

const { API_URL } = config;

export const apiHeaders = async () => {
    const token = await getItem('token');
    if (token) {
        return {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Language: 'gu, hi, en',
            },
        };
    }
    return {
        headers: {
            'Content-Type': 'application/json',
            Language: 'gu, hi, en',
        },
    };
};

export const getApi = async (url) => axios.get(`${API_URL}${url}`, await apiHeaders());

export const postApi = async (url, apiData) =>
    axios.post(`${API_URL}${url}`, apiData, await apiHeaders());

export const putApi = async (url, apiData) =>
    axios.put(`${API_URL}${url}`, apiData, await apiHeaders());

export const patchApi = async (url, apiData) =>
    axios.patch(`${API_URL}${url}`, apiData, await apiHeaders());

export const deleteApi = async (url) => axios.delete(`${API_URL}${url}`, await apiHeaders());

export const getApiError = (error) =>
    typeof error?.response?.data?.error === 'string'
        ? error.response.data.error
        : string.errors.somethingWrong;

export const setupInterceptors = () => {
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            // // WHEN NO ACCESS
            // if ([401].includes(error?.response?.status)) {
            //   removeAuthToken();
            //   window.location.reload();
            // }

            return Promise.reject(error);
        },
    );
};
