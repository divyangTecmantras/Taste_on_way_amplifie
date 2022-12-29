/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import LandingSearchBar from '../landingSearchBar/LandingSearchBar';
import LandingWidget1 from '../landingWidget1/LandingWidget1';
import LandingCarousel1 from '../landingCarousel1/LandingCarousel1';
import LandingCarousel2 from '../landingCarousel2/LandingCarousel2';
import LandingCarousel3 from '../landingCarousel3/LandingCarousel3';
import LandingFAQ from '../landingFAQ/LandingFAQ';
import { fetchKitchenOwnerList } from '../../../redux/actions/kitchenOwner/KitchenOwnerList';
import { fetchTopFiveRestaurantsList } from '../../../redux/actions/kitchenOwner/TopFiveRestaurantsList';
import { removeItem } from '../../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import '../../../assets/styles/media.css';
import '../../landingPage/landingPage/LandingPage.css';

const LandingPage = () => {
    const dispatch = useDispatch();
    const { kitchenOwnerList } = useSelector((state) => ({
        kitchenOwnerList: state?.kitchenOwnerList?.error?.response?.status,
    }));

    const kitchenListData = {
        lat: '23.0363817',
        long: '72.542188',
        city_name: 'Ahmedabad',
        radius: '5',
        search_by: '',
        area_name: 'Prahlad Nagar',
    };

    useEffect(() => {
        dispatch(fetchKitchenOwnerList(kitchenListData));
        dispatch(fetchTopFiveRestaurantsList(kitchenListData));
        navigator.geolocation.getCurrentPosition((position) => {
            console.log('🚀 ~ file: LandingPage.jsx ~ line 33 ~ useEffect ~ position', position);
        });

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
                <LandingCarousel3 />
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
