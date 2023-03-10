import React, { useEffect } from 'react';
import RestaurantContact from '../restaurantContact/RestaurantContact';
import RestaurantMenu from '../restaurantMenu/RestaurantMenu';
import RestaurantEnterAddress from '../restaurantEnterAddress/RestaurantEnterAddress';
import RestaurantReviews from '../restaurantReviews/RestaurantReviews';
import { fetchKitchenOwnerMenuList } from '../../../redux/actions/kitchenOwner/KitchenOwnerMenuList';
import { fetchKitchenOwnerDetails } from '../../../redux/actions/kitchenOwner/KitchenOwnerDetails';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logo from '../../../assets/images/delicious dosa logo.png';
import './RestaurantDetails.css';
import '../../../assets/styles/media.css';
import { getItem } from '../../../utils/utils';

const RestaurantDetails = () => {
    const dispatch = useDispatch();
    const { KitchenOwnerId } = useParams();
    const lat = getItem('lat');
    const long = getItem('long');

    useEffect(() => {
        const apiData = {
            business_owner_id: KitchenOwnerId,
        };

        const detailsAPIData = {
            kitchen_owner_id: KitchenOwnerId,
            lat: lat,
            long: long,
            radius: 6,
        };
        dispatch(fetchKitchenOwnerDetails(detailsAPIData));
        dispatch(fetchKitchenOwnerMenuList(apiData));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div className="LandingPageBgRestaurentsDetail">
                <div className="container">
                    <div className="row">
                        <img src={logo} alt=" " className="RestProfileImg" />
                    </div>
                </div>
            </div>
            <div className="container MainContainerRest">
                <RestaurantEnterAddress />
                <RestaurantMenu />
                <RestaurantReviews />
                <RestaurantContact />
            </div>
        </div>
    );
};

export default RestaurantDetails;
