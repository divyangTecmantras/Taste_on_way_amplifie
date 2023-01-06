/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import LandingSearchBar from '../landingSearchBar/LandingSearchBar';
import LandingWidget1 from '../landingWidget1/LandingWidget1';
import LandingCarousel1 from '../landingCarousel1/LandingCarousel1';
import LandingCarousel2 from '../landingCarousel2/LandingCarousel2';
import LandingFAQ from '../landingFAQ/LandingFAQ';
import { fetchKitchenOwnerList } from '../../../redux/actions/kitchenOwner/KitchenOwnerList';
import Geocode from 'react-geocode';
import { fetchTopFiveRestaurantsList } from '../../../redux/actions/kitchenOwner/TopFiveRestaurantsList';
import { getItem, removeItem } from '../../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import '../../../assets/styles/media.css';
import '../../landingPage/landingPage/LandingPage.css';

const LandingPage = () => {
    const dispatch = useDispatch();
    const { kitchenOwnerList } = useSelector((state) => ({
        kitchenOwnerList: state?.kitchenOwnerList?.error?.response?.status,
    }));

    useEffect(() => {
        const lat = getItem('lat');
        const long = getItem('long');
        Geocode.setApiKey('AIzaSyDcjtGb2jSVKXsUjxVAcJx6hboHbUe6fqI');
        Geocode.setLanguage('en');
        Geocode.setRegion('IN');
        Geocode.setLocationType('ROOFTOP');
        Geocode.enableDebug();
        Geocode.fromLatLng(lat, long).then(
            (response) => {
                const areaName = response?.results?.[0]?.address_components?.[1]?.long_name;
                const cityname = response?.results?.[0]?.address_components?.[2]?.short_name;

                const apiData = {
                    lat: lat,
                    long: long,
                    city_name: cityname,
                    radius: '5',
                    search_by: '',
                    area_name: areaName,
                };

                dispatch(fetchKitchenOwnerList(apiData));
                dispatch(fetchTopFiveRestaurantsList(apiData));
            },
            (error) => {
                return error;
            },
        );
        if (kitchenOwnerList == 401) {
            removeItem('token');
        }
    }, []);

    return (
        <>
            <div className="LandingPageBgRestaurents">
                <LandingSearchBar />
            </div>
            <div className="container TopMargin">
                <div className=" TopMargin">
                    <LandingCarousel1 />
                </div>
                <LandingCarousel2 />
                <LandingWidget1 />
            </div>
            <LandingFAQ />
        </>
    );
};

export default LandingPage;
