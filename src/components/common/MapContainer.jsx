/* eslint-disable no-undef */
import React from 'react';
import { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import { MarkerF } from '@react-google-maps/api';
import deliveryBoyIconMap_2 from '../../assets/images/deliveryBoyIconMap_2.png';
import { getItem } from '../../utils/utils';

const containerStyle = {
    width: '400px',
    height: '400px',
};
const lat = getItem('lat');
const long = getItem('long');
const center = { lat: Number(lat), lng: Number(long) };
export default function MapContainer({ source, destination, currentLocation, orderStatus }) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyDcjtGb2jSVKXsUjxVAcJx6hboHbUe6fqI',
        libraries: ['places'],
    });
    // eslint-disable-next-line no-unused-vars
    const [map, setMap] = React.useState(null);

    const [directionsResponse, setDirectionsResponse] = useState(null);
    const directionsService = new google.maps.DirectionsService();
    const liveLocation = currentLocation?.lat
        ? { lat: currentLocation?.lat, lng: currentLocation?.long }
        : null;
    useEffect(() => {
        const getDirection = async () => {
            const results = await directionsService.route({
                origin: `${source.latitude}, ${source.longitude}`,
                destination: `${destination.latitude}, ${destination.longitude}`,
                travelMode: google.maps.TravelMode.DRIVING,
            });
            setDirectionsResponse(results);
        };

        if (source && destination && orderStatus == 4) getDirection(); // run it, run it

        return () => {
            setDirectionsResponse(null);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [destination, source, orderStatus]);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map);
    }, []);

    // eslint-disable-next-line no-unused-vars
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);
    // const pos = { lat: 23.0146, lng: 72.5306 };

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <>
                {directionsResponse && (
                    <>
                        {liveLocation && orderStatus == 4 && (
                            <MarkerF
                                scaledSize={new google.maps.Size(50, 50)}
                                icon={deliveryBoyIconMap_2}
                                position={{
                                    lat: Number(liveLocation.lat),
                                    lng: Number(liveLocation.lng),
                                }}
                            />
                        )}
                        <DirectionsRenderer
                            directions={directionsResponse}
                            // options={{
                            //     markerOptions: {
                            //         icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                            //     },
                            // }}
                        />
                    </>
                )}
            </>
        </GoogleMap>
    ) : (
        <></>
    );
}
