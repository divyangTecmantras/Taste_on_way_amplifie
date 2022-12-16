/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import HomeBanner from './homebanner/HomeBanner';
import HomeWidget1 from './homeWidget1/HomeWidget1';
import HomeWidget2 from './homeWidget2/HomeWidget2';
import { setItem } from '../../utils/utils';
import { fetchCountryData } from '../../redux/actions/countryData/CountryData';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Toastify from '../common/Toastify';
import {
    ERROR_TOASTIFY_TYPE,
    OTP_VALIDATE_SUCCESS,
    OTP_VALIDATION_FAILURE,
    SUCCESS_TOASTIFY_TYPE,
} from '../../utils/enum';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { otpResponse } = useSelector((state) => ({
        otpResponse: state?.otpUser,
    }));

    useEffect(() => {
        dispatch(fetchCountryData());
        if (otpResponse?.payload?.data) {
            Toastify(OTP_VALIDATE_SUCCESS, SUCCESS_TOASTIFY_TYPE);
            setItem('token', otpResponse?.payload?.data?.[0]?.token);
            navigate('/landingPage');
        }

        if (otpResponse?.error) {
            Toastify(OTP_VALIDATION_FAILURE, ERROR_TOASTIFY_TYPE);
        }
    }, [otpResponse]);
    return (
        <div>
            <HomeBanner />
            <HomeWidget1 />
            <HomeWidget2 />
        </div>
    );
};

export default Home;
