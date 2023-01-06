import React, { useEffect } from 'react';
import Geocode from 'react-geocode';
import Profile from '../profile/Profile';
import EditProfile from '../editProfile/EditProfile';
import Activity from '../activity/Activity';
import Loader from '../../common/Loader';
import { fetchUserInfo } from '../../../redux/actions/user/userInfo';
import { fetchUserAddress } from '../../../redux/actions/user/userAddress';
import { fetchKitchenOwnerList } from '../../../redux/actions/kitchenOwner/KitchenOwnerList';
import { useDispatch, useSelector } from 'react-redux';
import '../../../assets/styles/media.css';
import './UserProfile.css';
import { getItem } from '../../../utils/utils';

const UserProfile = () => {
    const dispatch = useDispatch();
    const {
        deleteUserAddress,
        customerSupportLoading,
        customerSupport,
        addUserAddresssuccess,
        updateUserProfile,
    } = useSelector((state) => ({
        deleteUserAddress: state?.deleteAddress?.payload,
        customerSupportLoading: state?.customerSupport?.loading,
        customerSupport: state?.customerSupport?.payload.data,
        addUserAddresssuccess: state?.addUserAddress?.payload?.data,
        updateUserProfile: state?.updateUserProfile?.payload?.data,
    }));
    const lat = getItem('lat');
    const long = getItem('long');

    useEffect(() => {
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
            },
            (error) => {
                return error;
            },
        );
        dispatch(fetchUserInfo());
        dispatch(fetchUserAddress());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleteUserAddress, customerSupport, addUserAddresssuccess, updateUserProfile]);
    return (
        <>
            {customerSupportLoading ? (
                <div className="loader">
                    <Loader />
                </div>
            ) : (
                <>
                    <div className="ProfilePage">
                        <Profile />
                    </div>
                    <div className="container">
                        <EditProfile />
                        <Activity />
                    </div>
                </>
            )}
        </>
    );
};

export default UserProfile;
