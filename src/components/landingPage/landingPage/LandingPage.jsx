/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import LandingSearchBar from '../landingSearchBar/LandingSearchBar';
import LandingWidget1 from '../landingWidget1/LandingWidget1';
import LandingCarousel1 from '../landingCarousel1/LandingCarousel1';
import LandingCarousel2 from '../landingCarousel2/LandingCarousel2';
import LandingFAQ from '../landingFAQ/LandingFAQ';
import { fetchKitchenOwnerList } from '../../../redux/actions/kitchenOwner/KitchenOwnerList';
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
        const latitude = getItem('lat');
        const longitude = getItem('long');
        const GEOCODE_API_KEY = 'AIzaSyDcjtGb2jSVKXsUjxVAcJx6hboHbUe6fqI';
        async function fetchData() {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GEOCODE_API_KEY}`,
            );
            const json = await response.json();
            const areaName = json?.results?.[0]?.address_components?.[0]?.long_name;
            const cityName = json?.results?.[0]?.address_components?.[1]?.short_name;
            const apiData = {
                lat: latitude,
                long: longitude,
                city_name: cityName,
                radius: '5',
                search_by: '',
                area_name: areaName,
            };
            dispatch(fetchKitchenOwnerList(apiData));
            dispatch(fetchTopFiveRestaurantsList(apiData));
        }
        fetchData();
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
