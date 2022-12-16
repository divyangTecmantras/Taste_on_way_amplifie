import React, { useState } from 'react';
import { fetchKitchenOwnerList } from '../../../redux/actions/kitchenOwner/KitchenOwnerList';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { useDispatch } from 'react-redux';
import Geocode from 'react-geocode';
import { FormattedMessage } from 'react-intl';
import { injectIntl } from 'react-intl';
import locationImage from '../../../assets/images/location.png';
import fruitSaladImage from '../../../assets/images/healthy-fruit-salad.png';
// import '../../../assets/styles/style.css';
import './LandingSearchBar.css';

const LandingSearchBar = ({ intl }) => {
    const typeAddress = intl.formatMessage({
        id: 'Place_holder.Type Address',
        defaultMessage: 'Type Address',
    });
    const searchRestaurent = intl.formatMessage({
        id: 'Place_holder.Search for Restaurent',
        defaultMessage: 'Search for Restaurent',
    });
    const dispatch = useDispatch();
    const [status, setStatus] = useState(null);
    console.log('🚀 ~ file: LandingSearchBar.jsx ~ line 15 ~ LandingSearchBar ~ status', status);
    const [address, setAddress] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const kitchenListData = {
        lat: '23.0363817',
        long: '72.542188',
        city_name: 'Ahmedabad',
        radius: '5',
        search_by: searchValue,
        area_name: 'Prahlad Nagar',
    };

    const searchOptions = {
        strictBounds: true,
        types: ['geocode'],
        componentRestrictions: { country: 'IN' },
    };

    const handleSelect = async (value) => {
        setAddress(value);
        const result = await geocodeByAddress(value);
        const cityName = result[0].address_components[2].long_name;
        const areaName = result[0].address_components[0].long_name;

        const latlong = await getLatLng(result[0]);

        const locationData = {
            lat: latlong.lat,
            long: latlong.lng,
            city_name: cityName,
            radius: '5',
            search_by: '',
            area_name: areaName,
        };
        dispatch(fetchKitchenOwnerList(locationData));
    };

    const searchClick = () => {
        dispatch(fetchKitchenOwnerList(kitchenListData));
    };

    const detactCurrentLocation = () => {
        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser');
        } else {
            setStatus('Location...');
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setStatus(null);
                    Geocode.setApiKey('AIzaSyDcjtGb2jSVKXsUjxVAcJx6hboHbUe6fqI');
                    Geocode.setLanguage('en');
                    Geocode.setRegion('IN');
                    Geocode.setLocationType('ROOFTOP');
                    Geocode.enableDebug();
                    Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                        (response) => {
                            const address = response.results[0].formatted_address;
                            const addressSplit = address.split(',');
                            const apiData = {
                                lat: position.coords.latitude,
                                long: position.coords.longitude,
                                city_name: addressSplit[3],
                                radius: '5',
                                search_by: '',
                                area_name: addressSplit[2],
                            };
                            dispatch(fetchKitchenOwnerList(apiData));
                            setAddress(address);
                        },
                        (error) => {
                            console.error(error);
                        },
                    );
                },
                () => {
                    setStatus('Unable to retrieve your location');
                },
            );
        }
    };
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 CoverHeadRest">
                        <h1>
                            <FormattedMessage
                                id="Landing_page.Food delivery in Your City"
                                defaultMessage="Food delivery in <br /> Your City"
                                values={{ br: <br /> }}
                            />
                        </h1>
                        <div className="input-group InputGroupRest mb-3 mt-4">
                            <div>
                                <button
                                    className="btnBackgroundWhite"
                                    onClick={detactCurrentLocation}
                                >
                                    <img src={locationImage} alt="" />
                                </button>
                            </div>
                            <div>
                                <PlacesAutocomplete
                                    className="placeInput"
                                    value={address}
                                    onChange={setAddress}
                                    onSelect={handleSelect}
                                    searchOptions={searchOptions}
                                >
                                    {({
                                        getInputProps,
                                        suggestions,
                                        getSuggestionItemProps,
                                        loading,
                                    }) => (
                                        <div>
                                            <input
                                                className="placeInput"
                                                {...getInputProps({
                                                    placeholder: typeAddress,
                                                })}
                                            />
                                            <div style={{ position: 'absolute' }}>
                                                {loading ? <div>...loading</div> : null}
                                                {suggestions.map((suggestion) => {
                                                    const style = {
                                                        backgroundColor: suggestion.active
                                                            ? '#41b6e6'
                                                            : '#fff',
                                                        borderStyle: 'hidden',
                                                        color: 'black',
                                                    };
                                                    return (
                                                        <div key={suggestion.index}>
                                                            <div
                                                                className="suggestionInput"
                                                                {...getSuggestionItemProps(
                                                                    suggestion,
                                                                    {
                                                                        style,
                                                                    },
                                                                )}
                                                            >
                                                                {suggestion.description}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete>
                            </div>
                            <input
                                type="text"
                                className="form-control BtnInputSearch"
                                aria-label="Text input with dropdown  button"
                                placeholder={searchRestaurent}
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <div className="input-group-prepend">
                                <button className="btn btn-danger" onClick={searchClick}>
                                    <FormattedMessage
                                        id="Landing_page.Search"
                                        defaultMessage="Search"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <img
                            src={fruitSaladImage}
                            className="img-fluid BannerImgRestaurent"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default injectIntl(LandingSearchBar);
